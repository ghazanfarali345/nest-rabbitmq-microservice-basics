import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as DailyRotateFile from 'winston-daily-rotate-file';

async function bootstrap() {
  const instance = winston.createLogger({
    // options of Winston
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('UserApp', {
            // options
            colors: true,
          }),
        ),
      }),
      new DailyRotateFile({
        dirname: './apps/user',
        filename: 'combined.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.json(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(UserModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('USER'));
  await app.startAllMicroservices();
}
bootstrap();
