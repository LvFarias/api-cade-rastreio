import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CrudService } from 'src/app/services/crud.service';
import { DeliveryModel } from './delivery.model';

@Injectable()
export class DeliveryService extends CrudService<DeliveryModel> {
    constructor(
        @InjectModel(DeliveryModel)
        private deliveryRepository: ModelCtor<DeliveryModel>,
    ) {
        super(deliveryRepository);
    }
}

