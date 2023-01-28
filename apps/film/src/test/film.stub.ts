import { Film } from '../film.schema';

export const filmStub = (): Film => {
  return {
    title: 'Baaghi',
    release_year: '2014-05-25',
    actors: ['Tiger shrof', 'Sharadha kapoor'],
    director: 'xyz',
  };
};
