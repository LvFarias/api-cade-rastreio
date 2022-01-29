import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CrudService } from 'src/app/services/crud.service';
import { UserModel } from './user.model';

@Injectable()
export class UserService extends CrudService<UserModel> {
    constructor(
        @InjectModel(UserModel)
        private userRepository: ModelCtor<UserModel>,
    ) {
        super(userRepository);
    }
}

