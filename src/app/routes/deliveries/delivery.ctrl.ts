import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { DeliveryModel } from './delivery.model';
import { DeliveryService } from './delivery.service';

@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveryController {
    constructor(
        private deliveyService: DeliveryService,
    ) { }

    @Post()
    @ApiBody({ type: DeliveryModel })
    async create(@Body() delivery: DeliveryModel): Promise<any> {
        await this.deliveyService.create(delivery).catch(_ => new HttpException('', 500));
        return true;
    }

    @Get()
    async list(): Promise<any> {
        return this.deliveyService.list();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async getAddressById(@Param('id') id: number): Promise<DeliveryModel | void> {
        const res = await this.deliveyService.findById(id).catch(console.log);
        if (!res) new HttpException('not_foud', 404);
        return res;
    }

    @Put(':id')
    @ApiBody({ type: 'any' })
    async updateAddress(@Param('id') id: number, @Body() delivery: any): Promise<any> {
        await this.deliveyService.updateById(id, delivery).catch(_ => new HttpException('', 500));
        return true;
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async removeAddress(@Param('id') id: number): Promise<true> {
        await this.deliveyService.remove(id).catch(_ => new HttpException('', 500));
        return true;
    }
}