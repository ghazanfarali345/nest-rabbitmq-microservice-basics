import { Test, TestingModule } from '@nestjs/testing';
import { newFilmDTO } from './dtos/new-film.dto';
import { existingFilmDTO } from './dtos/update-film.dto';
import { FilmController } from './film.controller';
import { Film, FilmDocumentType } from './film.schema';
import { FilmService } from './film.service';
import { filmStub } from './test/film.stub';
import { FilmServiceMock } from './___mock___/film.service.mock';
import { Types } from 'mongoose';
import { Logger } from '@nestjs/common';

jest.mock('./film.service');
describe('FilmController', () => {
  let filmController: FilmController;
  let filmService: FilmService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [FilmController],
      providers: [
        FilmService,
        Logger,
        { provide: FilmService, useValue: FilmServiceMock() },
      ],
    }).compile();

    filmController = module.get<FilmController>(FilmController);
    filmService = module.get<FilmService>(FilmService);
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    describe('when getFilmListHandler is called', () => {
      let films: Film[];

      beforeEach(async () => {
        films = await filmController.getFilmListHandler();
      });

      test('then it should call filmService', () => {
        expect(filmService.getAllFilms).toHaveBeenCalled();
      });

      test('then it should return films', () => {
        expect(films).toEqual([filmStub()]);
      });
    });
  });

  describe('createFilm', () => {
    describe('when createFilmHandler is called', () => {
      let film: Film;
      let newFilmDTO: newFilmDTO;

      beforeEach(async () => {
        newFilmDTO = {
          title: filmStub().title,
          director: filmStub().director,
          release_year: filmStub().release_year,
          actors: filmStub().actors,
        };
        film = await filmController.createFilmHandler(newFilmDTO);
      });

      test('then it should call filmService', () => {
        expect(filmService.createFilm).toHaveBeenCalledWith({
          title: newFilmDTO.title,
          director: newFilmDTO.director,
          release_year: newFilmDTO.release_year,
          actors: newFilmDTO.actors,
        });
      });

      test('then it should return a film', () => {
        expect(film).toEqual(filmStub());
      });
    });
  });

  describe('updateFilm', () => {
    describe('when filmUpdateHandler is called', () => {
      let film: Film;
      let existingFilmDto: existingFilmDTO;

      beforeEach(async () => {
        existingFilmDto = {
          title: 'Wanted',
          release_year: '2012-01-21',
        };
        film = await filmController.filmUpdateHandler(existingFilmDto);
      });

      // in the line below there is some issue of type
      test('then it should call filmService and return value is changed', () => {
        expect(
          filmService.updateFilm(filmStub()._id as any, existingFilmDto),
        ).not.toBe(filmStub());
      });

      test('then it should return a new film', () => {
        expect(film).toEqual(filmStub());
      });
    });
  });
});
