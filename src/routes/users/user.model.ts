import OrderModel from '@routes/orders/order.model';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import UserConfigModel from './configs/config.model';

@Table({ modelName: 'Users', tableName: 'Users' })
export default class UserModel extends Model {
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