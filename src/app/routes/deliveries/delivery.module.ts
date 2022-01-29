import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from '../orders/order.model';
import { DeliveryController } from './delivery.ctrl';
import { DeliveryModel } from './delivery.model';
import { DeliveryService } from './delivery.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            DeliveryModel,
            OrderModel,
        ]),
    ],
    providers: [DeliveryService],
    controllers: [DeliveryController],
})
export class DeliveryModule { }