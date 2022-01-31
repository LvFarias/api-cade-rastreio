import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUserDTO } from '../routes/auth/auth.dto';

@Injectable()
export class UserAuthGuard extends AuthGuard('user') { }

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
	constructor() {
		super({
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(user: any): Promise<AuthUserDTO | Boolean> {
		if (!!user.id) return user;
		return false;
	}
}