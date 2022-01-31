import { Body, Controller, HttpCode, HttpException, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReqUser } from 'src/app/decorators/user.decorator';
import { LoginAuthGuard } from 'src/app/guards/login.guard';
import { AuthUserDTO, ChangePasswordDTO, ForgotPasswordDTO, LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    @HttpCode(201)
    @ApiBody({ type: RegisterDTO })
    async insert(@Body() registerDTO: RegisterDTO): Promise<void> {
        await this.authService.register(registerDTO).catch(e => { throw new HttpException(e, 400) });
        return;
    }

    @Put('forgot-password')
    @HttpCode(200)
    @ApiBody({ type: ForgotPasswordDTO })
    async forgotPassword(@Body() body: ForgotPasswordDTO): Promise<string> {
        await this.authService.forgotPassword(body.email);
        return 'Caso tenha uma cadastro, você receberá um email com os proximos passos.';
    }

    @Put('change-password')
    @HttpCode(200)
    @ApiBody({ type: ChangePasswordDTO })
    async changePassword(@Body() changePasswordDTO: ChangePasswordDTO): Promise<void> {
        await this.authService.changePassword(changePasswordDTO).catch(e => { throw new HttpException(e, 400) });
        return;
    }

    @Post('login')
    @HttpCode(200)
    @UseGuards(LoginAuthGuard)
    @ApiBody({ type: LoginDTO })
    async login(@ReqUser() user: any): Promise<AuthUserDTO> {
        return this.authService.createAuthToken(user);
    }
}