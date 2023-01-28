import { Controller, Get, Post, Body } from '@nestjs/common';
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

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @MessagePattern('create_film')
  async createFilmHandler(
    @Payload() payload: newFilmDTO,
    // @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.createFilm(payload);
  }

  @MessagePattern('film_list')
  async getFilmListHandler(): Promise<FilmDocumentType[]> {
    return this.filmService.getAllFilms();
  }

  @MessagePattern('film_update')
  async filmUpdateHandler(
    @Payload() payload: FilmDocumentType,
    @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.updateFilm(payload.id, payload);
  }

  @MessagePattern('film_delete')
  async filmDeleteHandler(
    @Payload() title: string,
    @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.deleteFilm(title);
  }
}
