import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CrudService from '@src/services/crud.service';
import { ModelCtor } from 'sequelize-typescript';
import UserConfigModel from './config.model';

@Injectable()
export default class UserConfigService extends CrudService<UserConfigModel> {
    constructor(
        @InjectModel(UserConfigModel)
        private userConfigRepository: ModelCtor<UserConfigModel>,
    ) {
        super(userConfigRepository);
    }
}

