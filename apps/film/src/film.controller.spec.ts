import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
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
});
