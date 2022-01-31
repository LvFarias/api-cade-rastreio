import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/app/guards/user.guard';
import { DeliveryDTO } from './delivery.dto';
import { DeliveryService } from './delivery.service';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveryController {
    constructor(
        private deliveyService: DeliveryService,
    ) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ type: DeliveryDTO, status: 200, isArray: true })
    list(): Promise<Array<DeliveryDTO>> {
        return this.deliveyService.list();
    }
}