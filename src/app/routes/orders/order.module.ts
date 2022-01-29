import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryModel } from '../deliveries/delivery.model';
import { UserModel } from '../users/user.model';
import { OrderController } from './order.ctrl';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            OrderModel,
            UserModel,
            DeliveryModel,
        ]),
    ],
    providers: [OrderService],
    controllers: [OrderController],
})
export class OrderModule { }