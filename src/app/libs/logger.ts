import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

function getTransports() {
  const myTransports = [];
  if (process.env.NODE_ENV == 'dev') {
    myTransports.push(
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.json(),
          utilities.format.nestLike('Cade-API'),
        ),
      })
    );
  } else {
    myTransports.push(
      new winston.transports.Console({
        level: 'http',
        format: winston.format.combine(
          winston.format.json(),
          utilities.format.nestLike('Cade-API'),
          winston.format.uncolorize(),
        )
      })
    );
  }

  return myTransports;
}

export const winstonConfig: WinstonModuleOptions = {
  transports: getTransports(),
  levels: winston.config.npm.levels,
};

export const logger: LoggerService = WinstonModule.createLogger(winstonConfig);