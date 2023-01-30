import { IsEmail, IsString, IsNumber } from 'class-validator';

export class NewUserDTO {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  location: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
