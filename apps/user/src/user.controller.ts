import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { newFilmDTO } from 'apps/film/src/dtos/new-film.dto';
import { NewUserDTO } from '../dtos/new-user.dto';
import { UserDetails } from '../user-details-interface';
import { UserDocumentType } from './user.schema';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern('create_user')
  async createUserHandler(
    @Payload() payload: NewUserDTO,
    @Ctx() context: RmqContext,
  ): Promise<UserDocumentType | UserDetails | string> {
    return this.userService.registerUser(payload);
  }
}
