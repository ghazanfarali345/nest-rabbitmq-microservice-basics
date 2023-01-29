import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_FILM_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/film/.env',
    }),
    RmqModule,
    DatabaseModule,
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmController],
  providers: [FilmService, Logger],
  exports: [],
})
export class FilmModule {}
