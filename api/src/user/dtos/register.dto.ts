import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
