import { utilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV == 'dev' ? 'debug' : 'http',
            format: winston.format.combine(
                winston.format.json(),
                utilities.format.nestLike('Cade-API'),
                process.env.NODE_ENV == 'dev' ? winston.format.colorize() : winston.format.uncolorize(),
            )
        })
    ],
};

export default winstonConfig;