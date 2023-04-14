import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @IsNotEmpty()
  nom: string;

  @Prop()
  @IsNotEmpty()
  prenom: string;

  @Prop()
  @IsEmail()
  email: string;

  @Prop()
  @IsNotEmpty()
  password: string;

  @Prop()
  matricule: string;

  @Prop()
  @IsNotEmpty()
  role: string;

  @Prop()
  etat: number;

  @Prop()
  date_inscription: string;

  @Prop()
  date_modification: string;

  @Prop()
  date_archivage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
