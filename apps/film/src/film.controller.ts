import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
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
import { AspectLogger } from './interceptors/logging.interceptor';

@UseInterceptors(new AspectLogger())
@Controller()
export class FilmController {
  constructor(
    private readonly filmService: FilmService,
    private logger: Logger,
  ) {}

  /**
   * create film event listner
   * Recives payload and sent back the response
   */

  @MessagePattern('create_film')
  async createFilmHandler(
    @Payload() payload: newFilmDTO,
    // @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.createFilm(payload);
  }

  /**
   * film list event listner
   * sends response
   */
  @MessagePattern('film_list')
  async getFilmListHandler(): Promise<FilmDocumentType[]> {
    return this.filmService.getAllFilms();
  }

  /**
   * update film event listner
   * Recieves payload for update film and sent back the response
   */

  @MessagePattern('film_update')
  async filmUpdateHandler(
    @Payload() payload: existingFilmDTO,
    // @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.updateFilm(payload._id as Types.ObjectId, payload);
  }

  /**
   * delete film event listner
   */

  @MessagePattern('film_delete')
  async filmDeleteHandler(
    @Payload() title: string,
    @Ctx() context: RmqContext,
  ): Promise<FilmDocumentType> {
    return this.filmService.deleteFilm(title);
  }
}
