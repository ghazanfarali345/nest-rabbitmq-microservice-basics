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
    let film = await this.filmModel.create({ ...data });
    return film;
  }

  /**
   * Film list service
   */
  async getAllFilms(): Promise<FilmDocumentType[]> {
    return await this.filmModel.find();
  }

  /**
   * update Film service
   */

  async updateFilm(
    _id: Types.ObjectId,
    data: existingFilmDTO,
  ): Promise<FilmDocumentType> {
    let film = await this.filmModel.findByIdAndUpdate(
      { _id: _id.id },
      { ...data },
      { new: true },
    );
    return film;
  }

  /**
   * delete Film service
   */

  async deleteFilm(title): Promise<FilmDocumentType> {
    let film = await this.filmModel.findOneAndDelete({ ...title });
    return film;
  }
}
