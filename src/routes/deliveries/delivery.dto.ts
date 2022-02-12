import { ApiProperty } from '@nestjs/swagger';
import { Field } from './delivery.model';

export class DeliveryDTO {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    alias: string;

    @ApiProperty({ type: Field, isArray: true })
    fields: Array<Field>;
}