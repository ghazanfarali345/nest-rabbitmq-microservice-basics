import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
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
          nestWinstonModuleUtilities.format.nestLike('API-GATEWAY', {
            // options
            colors: true,
          }),
        ),
      }),
      new DailyRotateFile({
        dirname: './apps/gateway',
        filename: 'combined.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        // maxFiles: '14d',

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          winston.format.json(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new AspectLogger());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
