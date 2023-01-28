import { Film, FilmDocumentType } from '../film.schema';
import { Types } from 'mongoose';

export const filmStub = () => {
  return {
    _id: '1',
    userId: '',
    title: 'Baaghi',
    release_year: '2014-05-25',
    actors: ['Tiger shrof', 'Sharadha kapoor'],
    director: 'xyz',
  };
};
