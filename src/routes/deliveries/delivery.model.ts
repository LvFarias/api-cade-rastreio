import { ApiProperty } from '@nestjs/swagger';
import OrderModel from '@routes/orders/order.model';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

export class Field {
    @ApiProperty()
    name: string;

    @ApiProperty()
    alias: string;

    @ApiProperty()
    type: string;
}

@Table({ modelName: 'Deliveries', tableName: 'Deliveries' })
export default class DeliveryModel extends Model {
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
    @ApiProperty({ type: [Field], isArray: true })
    fields: Array<Field>;

    @HasMany(() => OrderModel, 'delivery_id')
    orders: Array<OrderModel>;
}