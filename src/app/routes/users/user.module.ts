import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from '../orders/order.model';
import { UserConfigController } from './configs/config.ctrl';
import { UserConfigModel } from './configs/config.model';
import { UserConfigService } from './configs/config.service';
import { UserController } from './user.ctrl';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        SequelizeModule.forFeature([
            UserModel,
            OrderModel,
            UserConfigModel,
        ]),
    ],
    providers: [
        UserService,
        UserConfigService,
    ],
    controllers: [
        UserController,
        UserConfigController,
    ],
})
export class UserModule { }