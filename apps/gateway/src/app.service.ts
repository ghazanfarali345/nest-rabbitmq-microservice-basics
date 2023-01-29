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

  /**
   * Create Film Sercice
   * Takes a body and send it film service
   */

  async createFilm(request) {
    this.logger.log('create film request in gateway service', request);

    return this.filmClient.send('create_film', { ...request });
  }

  /**
   *  Film List
   *  Hits film_list event to get list of films from film service
   */
  async getFilmList() {
    return this.filmClient.send('film_list', {});
  }

  /**
   * Film Update by id
   * Hits film_update event to upadate film by id
   */

  async filmUpdate(id, request) {
    return this.filmClient.send('film_update', { id, ...request });
  }

  /**
   * Delte film by title
   * Hits film_delete event for delete film by title (Here i need to add slug insted title)
   */

  async filmDelete(title) {
    return this.filmClient.send('film_delete', title);
  }

  /**
   * Create User service
   * Hits create_user event with body to create user
   */

  async createUser(request) {
    return this.userClient.send('create_user', { ...request });
  }
}
