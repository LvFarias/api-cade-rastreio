import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import DeliveryModel from '@src/routes/deliveries/delivery.model';
import OrderModel from '@src/routes/orders/order.model';
import OrderService from '@src/routes/orders/order.service';
import UserConfigModel from '@src/routes/users/configs/config.model';
import UserConfigService from '@src/routes/users/configs/config.service';
import { Queue } from 'bull';
import { Op } from 'sequelize';
import { Logger } from 'winston';

@Injectable()
export class IncrementerService {
    constructor(
        private orderService: OrderService,
        private userConfigService: UserConfigService,
        @Inject('winston') private logger: Logger,
        @InjectQueue('amazon') private amazonQueue: Queue,
        @InjectQueue('correios') private correiosQueue: Queue,
    ) { }

    @Cron(CronExpression.EVERY_10_SECONDS)
    async increment15m(): Promise<void> {
        this.findOrders(15);
        this.findOrders(30);
        this.findOrders(60);
    }

    async findOrders(syncTime: number) {
        const ids = await this.userConfigService.list({ syncTime }, { fields: ['user_id'] });
        const orders = await this.orderService.list({
            inSync: false,
            user_id: ids.map(i => i.user_id),
            lastSync: { [Op.lte]: new Date(new Date().valueOf() - syncTime * 1000) }
        }, { include: [DeliveryModel] });
        
        if (orders.length === 0) {
            this.logger.info(`channels ${syncTime}m clear`);
        }
        
        orders.forEach(async order => {
            await this.addToQueue(order.delivery.alias, syncTime, order)
            order.inSync = true;
            await order.save();
        });
    }

    async addToQueue(queue: string, time: number, order: OrderModel) {
        const channel = `${time}m`;
        this.logger.debug(`Add job to queue ${queue}[${channel}] - ${order.id}`);
        await this[`${queue}Queue`].add(channel, order);
    }
}