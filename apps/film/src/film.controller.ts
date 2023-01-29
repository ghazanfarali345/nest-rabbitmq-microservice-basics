import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { FilmService } from './film.service';

import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

import { FilmDocumentType } from './film.schema';
import { newFilmDTO } from './dtos/new-film.dto';
import { existingFilmDTO } from './dtos/update-film.dto';
import { Types } from 'mongoose';

@Controller()
export class FilmController {
  constructor(
    private readonly filmService: FilmService,
    private logger: Logger,
  ) {}

  @MessagePattern('create_film')
  async createFilmHandler(
    @Payload() payload: newFilmDTO,
    // @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    this.logger.log('create_film', payload);
    return this.filmService.createFilm(payload);
  }

  @MessagePattern('film_list')
  async getFilmListHandler(): Promise<FilmDocumentType[]> {
    return this.filmService.getAllFilms();
  }

  @MessagePattern('film_update')
  async filmUpdateHandler(
    @Payload() payload: existingFilmDTO,
    // @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    this.logger.log('update film', payload);

    return this.filmService.updateFilm(payload._id as Types.ObjectId, payload);
  }

  @MessagePattern('film_delete')
  async filmDeleteHandler(
    @Payload() title: string,
    @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.deleteFilm(title);
  }
}
