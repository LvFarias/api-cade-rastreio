import { ApiProperty } from '@nestjs/swagger';
import DeliveryModel from '@routes/deliveries/delivery.model';
import UserModel from '@routes/users/user.model';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';

export class Value {
    @ApiProperty()
    alias: string;

    @ApiProperty()
    value: string;
}

export class Status {
    @ApiProperty()
    status: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    destine: string;
}

@Table({ modelName: 'Orders', tableName: 'Orders' })
export default class OrderModel extends Model {
    @Column
    name: string;

    @Column(DataType.TEXT)
    desc: string;

    @BelongsTo(() => DeliveryModel, 'delivery_id')
    delivery: DeliveryModel;

    @BelongsTo(() => UserModel, 'user_id')
    user: UserModel;

    @Column({
        type: DataType.TEXT,
        get(this) {
            return JSON.parse(this.getDataValue('values'));
        },
        set(value) {
            this.setDataValue('values', JSON.stringify(value));
        }
    })
    values: Array<Value>;

    @Column
    status: string;

    @Column
    lastSync: Date;
    
    @Column
    inSync: Boolean;

    @Column
    shippingDate: Date;

    @Column
    service: string;

    @Column
    origin: string;

    @Column({
        type: DataType.TEXT,
        get(this) {
            return JSON.parse(this.getDataValue('statusLog'));
        },
        set(value) {
            this.setDataValue('statusLog', JSON.stringify(value));
        }
    })
    statusLog: Array<Status>;
}