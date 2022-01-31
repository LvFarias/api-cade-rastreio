import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { OrderModel } from '../orders/order.model';
import { UserConfigModel } from './configs/config.model';

@Table({ modelName: 'Users', tableName: 'Users' })
export class UserModel extends Model {
    @Column
    name: string;

    @Column
    email: string;

    @Column(DataType.TEXT)
    password: string;

    @Column({ allowNull: true })
    token: string;

    @HasMany(() => OrderModel, 'user_id')
    order: Array<OrderModel>;

    @HasOne(() => UserConfigModel, 'user_id')
    config: UserConfigModel;
}