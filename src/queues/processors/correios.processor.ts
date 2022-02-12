import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { Logger } from 'winston';

@Processor('correios')
export class CorreiosProcessor {
    constructor(
        @Inject('winston') private logger: Logger,
    ) { }

    @Process('15m')
    async handle15m(job: Job): Promise<void> {
        this.logger.info('Start job to queue correios[15m]');
        this.logger.debug('job: ', job.data);
        this.logger.info('Ended job to queue correios[15m]');
    }

    @Process('30m')
    async handle30m(job: Job): Promise<void> {
        this.logger.info('Start job to queue correios[30m]');
        this.logger.debug('job: ', job.data);
        this.logger.info('Ended job to queue correios[30m]');
    }

    @Process('60m')
    async handle1h(job: Job): Promise<void> {
        this.logger.info('Start job to queue correios[60m]');
        this.logger.debug('job: ', job.data);
        this.logger.info('Ended job to queue correios[60m]');
    }
}
