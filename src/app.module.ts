import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import * as redisStore from 'cache-manager-redis-store';
import { WinstonModule } from 'nest-winston';
import { LoginStrategy } from './app/guards/login.guard';
import { UserStrategy } from './app/guards/user.guard';
import { LoggerInterceptor } from './app/interceptors/logger.interceptor';
import { winstonConfig } from './app/libs/logger';
import { AuthController } from './app/routes/auth/auth.ctrl';
import { AuthService } from './app/routes/auth/auth.service';
import { DeliveryController } from './app/routes/deliveries/delivery.ctrl';
import { DeliveryModel } from './app/routes/deliveries/delivery.model';
import { DeliveryService } from './app/routes/deliveries/delivery.service';
import { OrderController } from './app/routes/orders/order.ctrl';
import { OrderModel } from './app/routes/orders/order.model';
import { OrderService } from './app/routes/orders/order.service';
import { UserConfigController } from './app/routes/users/configs/config.ctrl';
import { UserConfigModel } from './app/routes/users/configs/config.model';
import { UserConfigService } from './app/routes/users/configs/config.service';
import { UserController } from './app/routes/users/user.ctrl';
import { UserModel } from './app/routes/users/user.model';
import { UserService } from './app/routes/users/user.service';
import { EmailService } from './app/services/email.service';

const routes = {
	controllers: [
		AuthController,
		UserController,
		UserConfigController,
		DeliveryController,
		OrderController,
	],
	models: [
		DeliveryModel,
		OrderModel,
		UserModel,
		UserConfigModel,
	],
	services: [
		AuthService,
		DeliveryService,
		OrderService,
		UserService,
		UserConfigService,
		EmailService,
	],
};

const guards = [
	LoginStrategy,
	UserStrategy,
];

const rootServices = [
	EmailService,
];

const rootProviders = [
	{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
];

const rootModules = [
	SequelizeModule.forRoot({
		host: process.env.DB_HOST,
		password: process.env.DB_PW,
		username: process.env.DB_USER,
		database: process.env.DB_NAME,
		port: parseInt(process.env.DB_PORT),
		dialect: 'mysql',
		synchronize: true,
		autoLoadModels: true,
		define: { paranoid: true },
		logging: process.env.NODE_ENV === 'dev' ? console.log : false,
	}),
	SequelizeModule.forFeature(routes.models),
	PassportModule,
	WinstonModule.forRoot(winstonConfig),
	CacheModule.register({
		ttl: 86400,
		store: redisStore,
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	}),
	JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: process.env.JWT_EXPIRES },
	}),
];

@Module({
	imports: [
		...rootModules,
	],
	controllers: [
		...routes.controllers,
	],
	providers: [
		...guards,
		...routes.services,
		...rootServices,
		...rootProviders,
	],
})
export class AppModule { }
