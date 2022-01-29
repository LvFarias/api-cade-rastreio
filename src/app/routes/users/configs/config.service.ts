import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CrudService } from 'src/app/services/crud.service';
import { UserConfigModel } from './config.model';

@Injectable()
export class UserConfigService extends CrudService<UserConfigModel> {
    constructor(
        @InjectModel(UserConfigModel)
        private userConfigRepository: ModelCtor<UserConfigModel>,
    ) {
        super(userConfigRepository);
    }
}

