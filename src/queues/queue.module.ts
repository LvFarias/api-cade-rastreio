import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import UserModule from '@routes/users/user.module';
import queueLoggerConfig from '@src/configs/queueLogger';
import OrderModule from '@src/routes/orders/order.module';
import { CorreiosService } from '@src/services/correios.service';
import { WinstonModule } from 'nest-winston';
import { IncrementerService } from './incrementer.service';
import { CorreiosProcessor } from './processors/correios.processor';

@Module({
    imports: [
        UserModule,
        OrderModule,
        ScheduleModule.forRoot(),
        WinstonModule.forRoot(queueLoggerConfig),
        BullModule.registerQueue({ name: 'amazon' }),
        BullModule.registerQueue({ name: 'correios' }),
    ],
    controllers: [],
    providers: [
        CorreiosService,
        CorreiosProcessor,
        IncrementerService,
    ],
})
export default class QueueModule { }