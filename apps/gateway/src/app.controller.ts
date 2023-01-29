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

  // Film routes

  @Post('/film')
  createFilmHandler(@Body() body: any) {
    this.logger.log('Film post api', body);
    let res = this.appService.createFilm(body);
    return res;
  }

  @Get('/film')
  getFilmListHandler() {
    let res = this.appService.getFilmList();
    this.logger.log('film list api', res);
    return res;
  }

  @Put('/film/:id')
  filmUpdateHandler(@Body() body: any, @Param() id: string) {
    return this.appService.filmUpdate(id, body);
  }

  @Delete('/film/:title')
  deleteHandler(@Param() title: string) {
    return this.appService.filmDelete(title);
  }

  // User routes

  @Post('/user/register')
  createUserHandler(@Body() body: any) {
    return this.appService.createUser(body);
  }
}
