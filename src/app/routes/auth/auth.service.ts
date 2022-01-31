import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from 'src/app/libs/hash';
import { EmailService } from 'src/app/services/email.service';
import { Logger } from 'winston';
import { UserModel } from '../users/user.model';
import { UserService } from '../users/user.service';
import { AuthUserDTO, ChangePasswordDTO, RegisterDTO } from './auth.dto';


@Injectable()
export class AuthService {
    constructor(
        @Inject('winston') private logger: Logger,
		private jwtService: JwtService,
        private userService: UserService,
        private emailService: EmailService,
    ) { }

    register(registerDTO: RegisterDTO): Promise<Boolean> {
        return new Promise(async (res, rej) => {
            const emailFinded = await this.userService.findByEmail(registerDTO.email);

            if (!!emailFinded) return rej('email already exists');

            registerDTO.password = await Hash.encryptPassword(registerDTO.password);
            delete registerDTO.repassword;

            const user: void | UserModel = await this.userService.create(registerDTO).catch(e => {
                this.logger.error(e);
                rej('create user error');
            });

            if (!user) return;

            this.emailService.welcome(user.email, user.name);

            res(true);
        })
    }

    async forgotPassword(email: string): Promise<void> {
        const user: any = await this.userService.findByEmail(email);
        if (!user) return;

        const token = Hash.createCode();
        await this.userService.updateById(user.id, { token });

        await this.emailService.forgotPassword(user.email, token);
    }

    changePassword(changePasswordDTO: ChangePasswordDTO): Promise<Boolean> {
        return new Promise(async (res, rej) => {
            const user = await this.userService.findOne({
                email: changePasswordDTO.email,
                token: changePasswordDTO.token,
            }).catch(e => {
                this.logger.error(e);
            });

            if (!user) return rej('invalid token');

            const password = await Hash.encryptPassword(changePasswordDTO.password);

            await this.userService.updateById(user.id, { password, token: null });

            res(true);
        });
    }

    async login(email: string, password: string): Promise<AuthUserDTO> {
        const user = await this.userService.findByEmail(email);
        if (user) {
            const isValidPassword = await Hash.comparePassword(password, user.password);
            if (isValidPassword) {
                const result = new AuthUserDTO().fromUser(user);
                return result;
            }
        }
        return null;
    }

    createAuthToken(user: AuthUserDTO): AuthUserDTO {
		user.jwt = this.jwtService.sign({...user});
		return user;
	}
}

