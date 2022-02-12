import { Body, Controller, Delete, Get, HttpCode, HttpException, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import ReqUser from '@src/decorators/user.decorator';
import { UserAuthGuard } from '@src/guards/user.guard';
import { EditUSerDTO, UserDTO } from './user.dto';
import UserService from './user.service';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('User')
@Controller('user')
export default class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    @HttpCode(200)
    @ApiResponse({ type: UserDTO, status: 200 })
    async getMe(@ReqUser('id') id: number): Promise<UserDTO> {
        return this.userService.getMe(id);
    }

    @Put()
    @HttpCode(200)
    @ApiBody({ type: EditUSerDTO })
    async editUser(@ReqUser('id') id: number, @Body() user: EditUSerDTO): Promise<void> {
        await this.userService.updateById(id, user).catch(e => { throw new HttpException(e, 500) });
        return;
    }

    @Delete()
    @HttpCode(200)
    async deleteAccount(@ReqUser('id') id: number): Promise<void> {
        await this.userService.remove(id).catch(e => { throw new HttpException(e, 500) });
        return;
    }
}