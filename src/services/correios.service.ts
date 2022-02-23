import { Inject } from '@nestjs/common';
import { StatusCorreiosEnum } from '@src/routes/orders/order.enum';
import OrderModel, { Status } from '@src/routes/orders/order.model';
import OrderService from '@src/routes/orders/order.service';
import { rastrearEncomendas } from 'correios-brasil';
import { Logger } from 'winston';

export class CorreiosService {
  constructor(
    @Inject('winston') private logger: Logger,
    private orderService: OrderService,
  ) {}

  async updateJob(
    order: OrderModel,
    sentNotification: Boolean = true,
  ): Promise<void> {
    let statusChange = false;
    const fields: any = {
      inSync: false,
      lastSync: new Date(),
    };

    const cod = order.values.find((v) => v.alias === 'cod');
    const statusLog = await this.findCorreios(cod.value).catch((e) => {
      this.logger.error(e);
    });
    
    if (!!statusLog) {
      const statusList = order.statusLog;
      
      for (const status of statusLog) {
        if (!!statusList.find((s) => s.date == status.date)) continue;
        statusList.push(status);
        statusChange = true;
      }

      const postedStatus = statusList.find((s) => s.status == 'posted');

      fields['statusLog'] = statusList;
      fields['status'] = statusList[statusList.length - 1].status;

      if (postedStatus) {
        fields['origin'] = postedStatus.origin;
        fields['shippingDate'] = postedStatus.date;
      }
    } else {
      fields['status'] = StatusCorreiosEnum['Não Postado'];
      fields['statusLog'] = [
        { status: StatusCorreiosEnum['Não Postado'], date: new Date() },
      ];
    }

    await this.orderService.updateById(order.id, fields);

    if (statusChange) {
      this.logger.info('Mudou o status');
      if (sentNotification) {
        this.logger.info('Aviso o User');
      }
    }
  }

  async findCorreios(cod: string): Promise<Array<Status>> {
    return new Promise(async (res, rej) => {
      const ret = await rastrearEncomendas([cod]).catch(rej);
      if (!ret) return;
      const statusList: Array<Status> = [];
      for (const i in ret[0]) {
        const status = ret[0][i];
        const dateParse = status.data.split('/');
        const hourParse = status.hora.split(':');
        const date = new Date(
          dateParse[2],
          dateParse[1],
          dateParse[0],
          ...hourParse,
        );
        statusList.push({
          date: date,
          origin: status.origem || status.local,
          destine: status.destino || status.local,
          status: StatusCorreiosEnum[status.status],
        });
      }
      res([statusList[0], statusList[1], , statusList[2]]);
    });
  }
}
