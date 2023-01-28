import { Test, TestingModule } from '@nestjs/testing';
import { newFilmDTO } from './dtos/new-film.dto';
import { FilmController } from './film.controller';
import { Film } from './film.schema';
import { FilmService } from './film.service';
import { filmStub } from './test/film.stub';
import { FilmServiceMock } from './___mock___/film.service.mock';

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
});
