import { MockModel } from '@app/common';
import { Film } from '../film.schema';
import { filmStub } from './film.stub';

export class filmMockModel extends MockModel<Film> {
  protected entityStub = filmStub();
}
