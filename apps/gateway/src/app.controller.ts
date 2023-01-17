import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // Film routes

  @Post('/film')
  createFilmHandler(@Body() body: any) {
    return this.appService.createFilm(body);
  }

  @Get('/film')
  getFilmListHandler() {
    return this.appService.getFilmList();
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
