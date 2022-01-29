import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }

    @Post()
    @ApiBody({ type: OrderModel })
    async create(@Body() order: OrderModel): Promise<any> {
        await this.orderService.create(order).catch(_ => new HttpException('', 500));
        return true;
    }

    @Get()
    async list(): Promise<any> {
        return this.orderService.list();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async getAddressById(@Param('id') id: number): Promise<OrderModel | void> {
        const res = await this.orderService.findById(id).catch(console.log);
        if (!res) new HttpException('not_foud', 404);
        return res;
    }

    @Put(':id')
    @ApiBody({ type: 'any' })
    async updateAddress(@Param('id') id: number, @Body() order: any): Promise<OrderModel | HttpException> {
        return this.orderService.updateById(id, order).catch(_ => new HttpException('', 500));
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async removeAddress(@Param('id') id: number): Promise<true> {
        await this.orderService.remove(id).catch(_ => new HttpException('', 500));
        return true;
    }
}