import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Status, Value } from './order.model';

export class OrderDTO {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    desc: string;

    @ApiProperty()
    delivery_id?: number;

    @ApiProperty()
    user_id?: number;

    @ApiProperty({ type: Value, isArray: true })
    values: Array<Value>;

    @ApiProperty()
    status: string;

    @ApiProperty()
    lastSync: Date;

    @ApiProperty()
    shippingDate: Date;

    @ApiProperty()
    expectedDate: Date;

    @ApiProperty()
    service: string;

    @ApiProperty()
    origin: string;

    @ApiProperty()
    destine: string;

    @ApiProperty({ type: Status, isArray: true })
    statusLog: Array<Status>;
}

export class OrderCreateDTO extends PartialType(
    PickType(OrderDTO, [
        'name',
        'desc',
        'delivery_id',
        'values',
    ] as const),
) { }

export class OrderEditDTO extends PartialType(
    PickType(OrderDTO, [
        'name',
        'desc',
    ] as const),
) { }