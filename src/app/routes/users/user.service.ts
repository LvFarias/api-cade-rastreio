import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { CrudService } from 'src/app/services/crud.service';
import { Logger } from 'winston';
import { UserConfigService } from './configs/config.service';
import { UserDTO } from './user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService extends CrudService<UserModel> {
    constructor(
        @Inject('winston') private logger: Logger,
        @InjectModel(UserModel)
        private userRepository: ModelCtor<UserModel>,
        private userConfigService: UserConfigService,
    ) {
        super(userRepository);
    }

    async create(entity: any): Promise<UserModel> {
        const user = await super.create(entity);
        await this.userConfigService.create({
            user_id: user.id,
            syncTime: process.env.SYNC_TIME,
            notifSms: process.env.NOTIF_SMS,
            notifPush: process.env.NOTIF_PUSH,
            notifEmail: process.env.NOTIF_EMAIL,
        })
        return user;
    }

    async getMe(id: number): Promise<UserDTO> {
        const user = await super.findById(id);
        const config = await this.userConfigService.findByUser(id);
        return new UserDTO().fromDb(user).withConfig(config);
    }
}

