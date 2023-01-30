import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { newFilmDTO } from './dtos/new-film.dto';
import { existingFilmDTO } from './dtos/update-film.dto';
import { Film, FilmDocumentType } from './film.schema';

@Injectable()
export class FilmService {
  constructor(
    @InjectModel('Film') private readonly filmModel: Model<Film>,
    private readonly logger: Logger,
  ) {}

  /**
   * create Film service
   */

  async createFilm(data: newFilmDTO): Promise<FilmDocumentType> {
    try {
      this.logger.log('create film', data);
      let film = await this.filmModel.create({ ...data });
      return film;
    } catch (error) {
      this.logger.error('create film error', error);
    }
  }

  /**
   * Film list service
   */
  async getAllFilms(): Promise<FilmDocumentType[]> {
    try {
      this.logger.log('film list');
      return await this.filmModel.find();
    } catch (error) {
      this.logger.error('film list error', error);
    }
  }

  /**
   * update Film service
   */

  async updateFilm(
    _id: Types.ObjectId,
    data: existingFilmDTO,
  ): Promise<FilmDocumentType> {
    try {
      this.logger.log('update film ', data, _id);
      let film = await this.filmModel.findByIdAndUpdate(
        { _id: _id.id },
        { ...data },
        { new: true },
      );
      return film;
    } catch (error) {
      this.logger.error('update film error', error);
    }
  }

  /**
   * delete Film service
   */

  async deleteFilm(title): Promise<FilmDocumentType> {
    try {
      this.logger.log('delete film,', title);
      let film = await this.filmModel.findOneAndDelete({ ...title });
      return film;
    } catch (error) {
      this.logger.error('delete film', error);
    }
  }
}
