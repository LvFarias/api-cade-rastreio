import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserConfigModel } from './config.model';
import { UserConfigService } from './config.service';

@ApiTags('Users')
@Controller('users/confg')
export class UserConfigController {
    constructor(
        private userConfigService: UserConfigService,
    ) { }

    @Post()
    @ApiBody({ type: UserConfigModel })
    async create(@Body() delivery: UserConfigModel): Promise<any> {
        await this.userConfigService.create(delivery).catch(_ => new HttpException('', 500));
        return true;
    }

    @Get()
    async list(): Promise<any> {
        return this.userConfigService.list();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async getAddressById(@Param('id') id: number): Promise<UserConfigModel | void> {
        const res = await this.userConfigService.findById(id).catch(console.log);
        if (!res) new HttpException('not_foud', 404);
        return res;
    }

    @Put(':id')
    @ApiBody({ type: 'any' })
    async updateAddress(@Param('id') id: number, @Body() delivery: any): Promise<any> {
        await this.userConfigService.updateById(id, delivery).catch(_ => new HttpException('', 500));
        return true;
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async removeAddress(@Param('id') id: number): Promise<true> {
        await this.userConfigService.remove(id).catch(_ => new HttpException('', 500));
        return true;
    }
}