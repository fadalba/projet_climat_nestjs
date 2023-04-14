import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class UpdateUserDto extends PickType(CreateUserDto, [
  'email',
  'nom',
  'prenom',
  'date_modification',
] as const) {}
