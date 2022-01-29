import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CrudService } from 'src/app/services/crud.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService extends CrudService<OrderModel> {
    constructor(
        @InjectModel(OrderModel)
        private orderRepository: ModelCtor<OrderModel>,
    ) {
        super(orderRepository);
    }
}

