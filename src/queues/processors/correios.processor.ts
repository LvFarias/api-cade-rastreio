import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import OrderModel from '@src/routes/orders/order.model';
import { CorreiosService } from '@src/services/correios.service';
import { Job } from 'bull';
import { Logger } from 'winston';

@Processor('correios')
export class CorreiosProcessor {
    constructor(
        @Inject('winston') private logger: Logger,
        private correiosService: CorreiosService,
    ) { }

    @Process('15m')
    async handle15m(job: Job<OrderModel>): Promise<void> {
        try {
            this.logger.info('Start job to queue correios[15m]');
            this.correiosService.updateJob(job.data);
            this.logger.info('Ended job to queue correios[15m]');
        } catch (error) {
            this.logger.error(error, error);
        }
    }

    @Process('30m')
    async handle30m(job: Job): Promise<void> {
        try {
            this.logger.info('Start job to queue correios[30m]');
            this.correiosService.updateJob(job.data);
            this.logger.info('Ended job to queue correios[30m]');
        } catch (error) {
            this.logger.error(error, error);
        }
    }

    @Process('60m')
    async handle1h(job: Job): Promise<void> {
        try {
            this.logger.info('Start job to queue correios[60m]');
            this.correiosService.updateJob(job.data);
            this.logger.info('Ended job to queue correios[60m]');
        } catch (error) {
            this.logger.error(error, error);
        }
    }
}
