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
    @ApiProperty()
    name: string;

    @Column(DataType.TEXT)
    @ApiProperty()
    desc: string;

    @ApiProperty()
    delivery_id: Number;

    @BelongsTo(() => DeliveryModel, 'delivery_id')
    delivery: DeliveryModel;

    @ApiProperty()
    user_id: Number;

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
    @ApiProperty({ type: [Value] })
    values: Array<Value>;

    @Column
    @ApiProperty()
    status: string;

    @Column
    @ApiProperty()
    lastSync: Date;

    @Column
    @ApiProperty()
    shippingDate: Date;

    @Column
    @ApiProperty()
    expectedDate: Date;

    @Column
    @ApiProperty()
    service: string;

    @Column
    @ApiProperty()
    origin: string;

    @Column
    @ApiProperty()
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
    @ApiProperty({ type: [Status] })
    statusLog: Array<Status>;
}