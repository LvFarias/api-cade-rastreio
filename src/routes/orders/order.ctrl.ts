import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import ReqUser from '@src/decorators/user.decorator';
import { UserAuthGuard } from '@src/guards/user.guard';
import { CorreiosProcessor } from '@src/queues/processors/correios.processor';
import { CorreiosService } from '@src/services/correios.service';
import DeliveryService from '../deliveries/delivery.service';
import { OrderCreateDTO, OrderDTO, OrderEditDTO } from './order.dto';
import OrderModel from './order.model';
import OrderService from './order.service';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Orders')
@Controller('orders')
export default class OrderController {
    constructor(
        private orderService: OrderService,
        private deliveryService: DeliveryService,
        private correiosService: CorreiosService,
    ) { }

    @Post()
    @HttpCode(201)
    @ApiBody({ type: OrderCreateDTO })
    async create(@ReqUser('id') user_id: number, @Body() order: OrderCreateDTO): Promise<void> {
        const newOrder = await this.orderService.createOrder(user_id, order).catch(e => { throw new HttpException(e, 500) });
        if (newOrder) {
            const delivery = await this.deliveryService.findById(order.delivery_id, null, ['alias']);
            await this[`${delivery.alias}Service`].updateJob(newOrder, false);
        }
        return;
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({ type: OrderDTO, status: 200, isArray: true })
    async list(@ReqUser('id') user_id: number): Promise<Array<OrderModel>> {
        return this.orderService.list({ user_id }).catch(e => { throw new HttpException(e, 500) });
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({ type: OrderDTO, status: 200 })
    @ApiParam({ name: 'id', type: Number })
    async getDetails(@ReqUser('id') user_id: number, @Param('id') id: number): Promise<OrderModel> {
        const res = await this.orderService.findById(id, user_id).catch(e => { throw new HttpException(e, 500) });

        if (!res) throw new HttpException('order not found', 404);

        return res;
    }

    @Put(':id')
    @HttpCode(200)
    @ApiBody({ type: OrderEditDTO })
    async update(@ReqUser('id') user_id: number, @Param('id') id: number, @Body() order: OrderEditDTO): Promise<void> {
        await this.orderService.updateById(id, order, user_id).catch(e => { throw new HttpException(e, 500) });
        return;
    }

    @Delete(':id')
    @HttpCode(200)
    @ApiParam({ name: 'id', type: Number })
    async removeAddress(@ReqUser('id') user_id: number, @Param('id') id: number): Promise<void> {
        await this.orderService.remove(id, user_id).catch(e => { throw new HttpException(e, 500) });
        return;
    }
}