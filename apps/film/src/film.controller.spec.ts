import { Test, TestingModule } from '@nestjs/testing';
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
});
