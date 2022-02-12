import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CrudService from '@src/services/crud.service';
import { ModelCtor } from 'sequelize-typescript';
import DeliveryModel from './delivery.model';

@Injectable()
export default class DeliveryService extends CrudService<DeliveryModel> {
    constructor(
        @InjectModel(DeliveryModel)
        private deliveryRepository: ModelCtor<DeliveryModel>,
    ) {
        super(deliveryRepository);
    }
}

