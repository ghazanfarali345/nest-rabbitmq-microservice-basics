import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDTO } from '../dtos/new-user.dto';
import { User, UserDocumentType } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../user-details-interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocumentType>,
  ) {}

  private logger = new Logger(UserService.name);

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async findByEmail(email: string): Promise<UserDocumentType> {
    return this.userModel.findOne({ email }).exec();
  }

  // async createUser(data: NewUserDTO): Promise<UserDocumentType> {
  //   let user = await this.userModel.create({ ...data });
  //   return user;
  // }

  _getUserDetails(user: UserDocumentType): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      location: user.location,
    };
  }

  async registerUser(
    data: NewUserDTO,
  ): Promise<UserDocumentType | string | UserDetails> {
    const { email, password } = data;

    const existingUser = await this.findByEmail(email);

    console.log({ existingUser });

    if (existingUser) return 'Email taken!';

    const hashedPassword = await this.hashPassword(password);
    data.password = hashedPassword;

    // console.log()

    const newUser = await this.userModel.create(data);

    return this._getUserDetails(newUser);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
