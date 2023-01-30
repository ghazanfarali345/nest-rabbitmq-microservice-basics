import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NewUserDTO } from '../dtos/new-user.dto';
import { UserDetails } from '../user-details-interface';
import { UserDocumentType } from './user.schema';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  /**
   * Create user listner
   * @param payload - the body of user
   * @param context - rmq context
   * @returns
   */

  @MessagePattern('create_user')
  async createUserHandler(
    @Payload() payload: NewUserDTO,
    @Ctx() context: RmqContext,
  ): Promise<UserDocumentType | UserDetails | string> {
    this.logger.log('create user listner', payload);
    return this.userService.registerUser(payload);
  }
}
