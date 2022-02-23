import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import DeliveryModel from '@routes/deliveries/delivery.model';
import UserModel from '@routes/users/user.model';
import { CorreiosService } from '@src/services/correios.service';
import DeliveryModule from '../deliveries/delivery.module';
import OrderController from './order.ctrl';
import OrderModel from './order.model';
import OrderService from './order.service';

@Module({
  imports: [
    DeliveryModule,
    SequelizeModule.forFeature([OrderModel, UserModel, DeliveryModel]),
  ],
  providers: [OrderService, CorreiosService],
  controllers: [OrderController],
  exports: [OrderService],
})
export default class OrderModule {}
