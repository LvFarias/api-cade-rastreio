import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import UserModule from '@routes/users/user.module';
import jwtConfig from '@src/configs/jwt';
import EmailService from '@src/services/email.service';
import AuthController from './auth.ctrl';
import AuthService from './auth.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register(jwtConfig),
    ],
    providers: [AuthService, EmailService],
    controllers: [AuthController],
    exports: [AuthService],
})
export default class AuthModule { }
