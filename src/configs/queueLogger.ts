import { utilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const queueLoggerConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV == 'dev' ? 'debug' : 'info',
            format: winston.format.combine(
                utilities.format.nestLike('Cade-Queue'),
                process.env.NODE_ENV == 'dev' ? winston.format.colorize() : winston.format.uncolorize(),
            )
        })
    ],
};

export default queueLoggerConfig;