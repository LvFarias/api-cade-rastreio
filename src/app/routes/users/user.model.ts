import { ApiProperty } from '@nestjs/swagger';
import { Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { OrderModel } from '../orders/order.model';
import { UserConfigModel } from './configs/config.model';

@Table({ modelName: 'Users', tableName: 'Users' })
export class UserModel extends Model {
    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    email: string;

    @Column
    @ApiProperty()
    password: string;

    @HasMany(() => OrderModel, 'user_id')
    order: Array<OrderModel>;

    @HasOne(() => UserConfigModel, 'user_id')
    config: UserConfigModel;
}