import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../routes/auth/auth.service';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') { }

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email', passwordField: 'password' });
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authService.login(email, password);
		if (!user) {
			throw new HttpException('invalid email or password', 400)
		}
		return user;
	}
}