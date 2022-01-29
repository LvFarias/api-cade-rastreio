import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { OrderModel } from '../orders/order.model';

export class Field {
    @ApiProperty()
    name: string;

    @ApiProperty()
    alias: string;

    @ApiProperty()
    type: string;
}

@Table({ modelName: 'Deliveries', tableName: 'Deliveries' })
export class DeliveryModel extends Model {
    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    alias: string;

    @Column({
        type: DataType.TEXT,
        get(this) { return JSON.parse(this.getDataValue('fields')); },
        set(value) { this.setDataValue('fields', JSON.stringify(value)); }
    })
    @ApiProperty({ type: [Field] })
    fields: Array<Field>;

    @HasMany(() => OrderModel, 'delivery_id')
    orders: Array<OrderModel>;
}