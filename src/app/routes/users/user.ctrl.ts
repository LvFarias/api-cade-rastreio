import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post()
    @ApiBody({ type: UserModel })
    async create(@Body() user: UserModel): Promise<any> {
        await this.userService.create(user).catch(_ => new HttpException('', 500));
        return true;
    }

    @Get()
    async list(): Promise<any> {
        return this.userService.list();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async getAddressById(@Param('id') id: number): Promise<UserModel | void> {
        const res = await this.userService.findById(id).catch(console.log);
        if (!res) new HttpException('not_foud', 404);
        return res;
    }

    @Put(':id')
    @ApiBody({ type: 'any' })
    async updateAddress(@Param('id') id: number, @Body() user: any): Promise<any> {
        await this.userService.updateById(id, user).catch(_ => new HttpException('', 500));
        return true;
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'number' })
    async removeAddress(@Param('id') id: number): Promise<true> {
        await this.userService.remove(id).catch(_ => new HttpException('', 500));
        return true;
    }
}