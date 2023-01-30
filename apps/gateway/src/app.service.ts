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
    try {
      this.logger.log('create film request in gateway service', request);
      return this.filmClient.send('create_film', { ...request });
    } catch (error) {
      this.logger.error('create film err', error);
    }
  }

  /**
   *  Film List
   *  Hits film_list event to get list of films from film service
   */
  async getFilmList() {
    try {
      this.logger.log('film list');
      return this.filmClient.send('film_list', {});
    } catch (error) {
      this.logger.error('film list error ', error);
    }
  }

  /**
   * Film Update by id
   * Hits film_update event to upadate film by id
   */

  async filmUpdate(id, request) {
    try {
      this.logger.log('film update', request, id);

      return this.filmClient.send('film_update', { id, ...request });
    } catch (error) {
      this.logger.error('film update error ', error);
    }
  }

  /**
   * Delte film by title
   * Hits film_delete event for delete film by title (Here i need to add slug insted title)
   */

  async filmDelete(title) {
    try {
      this.logger.log('film delete request by title', title);

      return this.filmClient.send('film_delete', title);
    } catch (error) {
      this.logger.error('film delete error', error);
    }
  }

  /**
   * Create User service
   * Hits create_user event with body to create user
   */

  async createUser(request) {
    try {
      this.logger.log('create user', request);

      return this.userClient.send('create_user', { ...request });
    } catch (error) {
      this.logger.error('create user error', request);
    }
  }
}
