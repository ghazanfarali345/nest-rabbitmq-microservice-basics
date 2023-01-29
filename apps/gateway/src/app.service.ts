import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FILM_SERVICE, USER_SERVICE } from './constants/constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(FILM_SERVICE) private filmClient: ClientProxy,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
    private readonly logger: Logger,
  ) {}

  getHello() {
    return 'hello ';
  }

  // Film Services
  async createFilm(request) {
    this.logger.log('create film request in gateway service', request);

    return this.filmClient.send('create_film', { ...request });
  }

  async getFilmList() {
    return this.filmClient.send('film_list', {});
  }

  async filmUpdate(id, request) {
    return this.filmClient.send('film_update', { id, ...request });
  }
  async filmDelete(title) {
    return this.filmClient.send('film_delete', title);
  }

  // User Services

  async createUser(request) {
    return this.userClient.send('create_user', { ...request });
  }
}
