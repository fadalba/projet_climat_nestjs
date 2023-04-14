import { Schema } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';

@Schema()
export class CreateUserDto extends User {}
