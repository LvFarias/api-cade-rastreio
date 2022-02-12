import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserConfigController from './configs/config.ctrl';
import UserConfigModel from './configs/config.model';
import UserConfigService from './configs/config.service';
import UserController from './user.ctrl';
import UserModel from './user.model';
import UserService from './user.service';

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel, UserConfigModel]),
    ],
    providers: [UserService, UserConfigService],
    controllers: [UserController, UserConfigController],
    exports: [UserService, UserConfigService],
})
export default class UserModule { }
