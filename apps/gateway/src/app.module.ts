import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FILM_SERVICE, USER_SERVICE } from './constants/constants';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AspectLogger } from './interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/gateway/.env',
    }),
    DatabaseModule,
    RmqModule.register({
      name: FILM_SERVICE,
    }),
    RmqModule.register({
      name: USER_SERVICE,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: AspectLogger,
    },
  ],
})
export class AppModule {}
