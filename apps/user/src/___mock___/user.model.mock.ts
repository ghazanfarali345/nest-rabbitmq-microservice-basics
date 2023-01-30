import { MockModel } from '@app/common';
import { User } from '../user.schema';
import { userStub } from './user.stub';
export class userMockModel extends MockModel<User> {
  protected entityStub = userStub();
}
