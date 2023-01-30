import { RmqService } from '@app/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FilmModule } from './film.module';

import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as DailyRotateFile from 'winston-daily-rotate-file';
import { AspectLogger } from './interceptors/logging.interceptor';

async function bootstrap() {
  const instance = winston.createLogger({
    // options of Winston
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('MyFilmApp', {
            // options
            colors: true,
          }),
        ),
      }),
      new DailyRotateFile({
        dirname: './apps/film',
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

  const app = await NestFactory.create(FilmModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FILM'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new AspectLogger());

  await app.startAllMicroservices();
}
bootstrap();
