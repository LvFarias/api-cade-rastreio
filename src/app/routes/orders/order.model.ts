import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { DeliveryModel } from '../deliveries/delivery.model';
import { UserModel } from '../users/user.model';

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
export class OrderModel extends Model {
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
    shippingDate: Date;

    @Column
    expectedDate: Date;

    @Column
    service: string;

    @Column
    origin: string;

    @Column
    destine: string;

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