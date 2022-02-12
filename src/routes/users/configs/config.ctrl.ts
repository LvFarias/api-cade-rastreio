import { Body, Controller, HttpException, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import ReqUser from '@src/decorators/user.decorator';
import { UserAuthGuard } from '@src/guards/user.guard';
import { UserConfigDTO } from '../user.dto';
import UserConfigService from './config.service';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('User')
@Controller('user/confg')
export default class UserConfigController {
    constructor(
        private userConfigService: UserConfigService,
    ) { }

    @Put()
    @ApiBody({ type: UserConfigDTO })
    async updateAddress(@ReqUser('id') userId: number, @Body() config: UserConfigDTO): Promise<void> {
        await this.userConfigService.updateByUser(userId, config).catch(e => { throw new HttpException(e, 500) });
        return;
    }
}