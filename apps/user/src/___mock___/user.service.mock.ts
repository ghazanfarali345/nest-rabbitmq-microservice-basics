import { userStub } from './user.stub';

export const FilmServiceMock = jest.fn().mockReturnValue({
  registerUser: jest.fn().mockResolvedValue(userStub()),
});
