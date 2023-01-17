import { RmqService } from '@app/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FilmModule } from './film.module';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('FILM'));
  await app.startAllMicroservices();
}
bootstrap();
