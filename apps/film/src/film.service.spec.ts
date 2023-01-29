import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Film } from './film.schema';
import { FilmService } from './film.service';
import { filmStub } from './test/film.stub';
import { filmMockModel } from './test/film.model.mock';

describe('FilmService', () => {
  let filmService: FilmService;

  describe('find operations', () => {
    let filmModel: filmMockModel;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          FilmService,
          {
            provide: getModelToken(Film.name),
            useClass: filmMockModel,
          },
        ],
      }).compile();

      filmService = moduleRef.get<FilmService>(FilmService);
      filmModel = moduleRef.get<filmMockModel>(getModelToken(Film.name));

      jest.clearAllMocks();
    });

    describe('find', () => {
      describe('when find is called', () => {
        let films: Film[];

        beforeEach(async () => {
          jest.spyOn(filmModel, 'find');
          films = await filmService.getAllFilms();
        });

        test('then it should call the filmModel', () => {
          expect(filmModel.find).toHaveBeenCalledWith();
        });

        test('then it should return a films array', () => {
          expect(films).toEqual([filmStub()]);
        });
      });
    });
  });
});
