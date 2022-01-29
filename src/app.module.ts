import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryModule } from './app/routes/deliveries/delivery.module';
import { OrderModule } from './app/routes/orders/order.module';
import { UserModule } from './app/routes/users/user.module';


const routes = [
	DeliveryModule,
	OrderModule,
	UserModule,
];

const modules = [
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
		logging: process.env.NODE_ENV === 'dev',
	}),
	// PassportModule,
	// WinstonModule.forRoot(winstonConfig),
	// CacheModule.register({
	// 	ttl: 86400,
	// 	store: redisStore,
	// 	host: process.env.REDIS_HOST,
	// 	port: process.env.REDIS_PORT,
	// }),
	// JwtModule.register({
	// 	secret: process.env.JWT_EXTERNAL,
	// 	signOptions: { expiresIn: process.env.JWT_EXTERNAL_EX },
	// }),
];

const guards = [];

const providers = [
	// JwtInternal,
	// { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
];

@Module({
	imports: [
		...routes,
		...modules,
	],
	providers: [
		...guards,
		...providers,
	],
})
export class AppModule { }
