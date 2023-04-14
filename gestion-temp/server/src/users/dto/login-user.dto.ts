import { Schema } from '@nestjs/mongoose';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export enum Role {
  User = 'utilisateur',
  Admin = 'admin',
}

@Schema()
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
  'role',
] as const) {}
