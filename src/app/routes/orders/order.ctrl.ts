import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqUser } from 'src/app/decorators/user.decorator';
import { UserAuthGuard } from 'src/app/guards/user.guard';
import { OrderCreateDTO, OrderDTO, OrderEditDTO } from './order.dto';
import { OrderService } from './order.service';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) { }

    @Post()
    @HttpCode(201)
    @ApiBody({ type: OrderCreateDTO })
    async create(@ReqUser('id') user_id: number, @Body() order: OrderCreateDTO): Promise<void> {
        await this.orderService.createOrder(user_id, order).catch(e => { throw new HttpException(e, 500) });
        return;
    }

    @Get()
    @HttpCode(200)
    @ApiResponse({ type: OrderDTO, status: 200, isArray: true })
    async list(@ReqUser('id') user_id: number): Promise<Array<OrderDTO>> {
        return this.orderService.list({ user_id }).catch(e => { throw new HttpException(e, 500) });
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({ type: OrderDTO, status: 200 })
    @ApiParam({ name: 'id', type: Number })
    async getDetails(@ReqUser('id') user_id: number, @Param('id') id: number): Promise<OrderDTO> {
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