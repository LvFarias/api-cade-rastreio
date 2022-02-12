import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import redisStore from 'cache-manager-redis-store';
import { WinstonModule } from 'nest-winston';
import bullConfig from './configs/bull';
import cacheConfig from './configs/cache';
import sequelizeConfig from './configs/sequelize';
import winstonConfig from './configs/winston';
import rootStrategies from './guards/strategies';
import LoggerInterceptor from './interceptors/logger.interceptor';
import QueueModule from './queues/queue.module';
import routeModules from './routes/modules';

@Module({
	imports: [
		...routeModules,
		QueueModule,
		PassportModule,
		BullModule.forRoot(bullConfig),
		WinstonModule.forRoot(winstonConfig),
		SequelizeModule.forRoot(sequelizeConfig),
		CacheModule.register({ ...cacheConfig, store: redisStore }),
	],
	providers: [
		...rootStrategies,
		{ provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
	],
})
export class AppModule { }
