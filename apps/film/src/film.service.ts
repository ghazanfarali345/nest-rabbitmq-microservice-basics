import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { newFilmDTO } from './dtos/new-film.dto';
import { existingFilmDTO } from './dtos/update-film.dto';
import { Film, FilmDocumentType } from './film.schema';

@Injectable()
export class FilmService {
  constructor(@InjectModel('Film') private readonly filmModel: Model<Film>) {}

  private logger = new Logger(FilmService.name);

  async createFilm(data: newFilmDTO): Promise<FilmDocumentType> {
    let film = await this.filmModel.create({ ...data });
    return film;
  }

  async getAllFilms(): Promise<FilmDocumentType[]> {
    return await this.filmModel.find();
  }

  async updateFilm(
    _id: Types.ObjectId,
    data: existingFilmDTO,
  ): Promise<FilmDocumentType> {
    this.logger.log('Update >>>>', { _id });
    let film = await this.filmModel.findByIdAndUpdate(
      { _id: _id.id },
      { ...data },
      { new: true },
    );
    return film;
  }

  async deleteFilm(title): Promise<FilmDocumentType> {
    this.logger.log('Update >>>>', title);

    let film = await this.filmModel.findOneAndDelete({ ...title });
    return film;
  }

  // async searchFilm(req: newFilmDTO): Promise<FilmDocumentType> {
  //   let search = req;

  //   let keyword = search
  //     ? {
  //         title: {
  //           $regex: req.query.search,
  //           $options: 'i',
  //         },
  //         director: {
  //           $regex: req.query.search,
  //           $options: 'i',
  //         },
  //         release_year: {
  //           $regex: req.query.search,
  //           $options: 'i',
  //         },
  //         actors: {
  //           $in: {
  //             $regex: req.query.search,
  //             $options: 'i',
  //           },
  //         },
  //       }
  //     : {};

  //   let film = await this.filmModel.find(keyword);
  //   return film;
  // }
}
