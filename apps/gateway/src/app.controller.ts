import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  /**
   * Create Film
   * @body {object} - Film body
   */

  @Post('/film')
  createFilmHandler(@Body() body: any) {
    this.logger.log('Film post api', body);
    return this.appService.createFilm(body);
  }

  // Get Film list
  @Get('/film')
  getFilmListHandler() {
    let res = this.appService.getFilmList();
    this.logger.log('film list api', res);
    return res;
  }

  /**
   * Update Film by id
   * @body {object} - fileds for update
   * @param {ObjectId} - film id for update
   */
  @Put('/film/:id')
  filmUpdateHandler(@Body() body: any, @Param() id: string) {
    this.logger.log('film list api', body, id);

    return this.appService.filmUpdate(id, body);
  }

  /**
   * Delete film by title
   * @param {string} title  - title of film
   *
   */

  @Delete('/film/:title')
  deleteHandler(@Param() title: string) {
    return this.appService.filmDelete(title);
  }

  /**
   * Create User
   * @body { request object} - User body
   */

  @Post('/user/register')
  createUserHandler(@Body() body: any) {
    this.logger.log('create user', body);
    return this.appService.createUser(body);
  }
}
