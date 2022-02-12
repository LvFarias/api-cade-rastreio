import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CrudService from '@src/services/crud.service';
import { ModelCtor } from 'sequelize-typescript';
import { OrderCreateDTO } from './order.dto';
import OrderModel from './order.model';

@Injectable()
export default class OrderService extends CrudService<OrderModel> {
    constructor(
        @InjectModel(OrderModel)
        private orderRepository: ModelCtor<OrderModel>,
    ) {
        super(orderRepository);
    }

    async createOrder(user_id: number, order: OrderCreateDTO): Promise<OrderModel> {
        order['user_id'] = user_id;
        order['status'] = 'Não Sincronizado';
        order['statusLog'] = {
            status: order['status'],
            date: new Date(),
        };
        return super.create(order);
    }
}

