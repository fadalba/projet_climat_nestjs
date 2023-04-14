import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClimatDocument = HydratedDocument<Climat>;

@Schema({ collection: 'climat' })
export class Climat {
  @Prop(raw({ temperature: String, humidity: String }))
  '8h': {
    temperature: string;
    humidity: string;
  };

  @Prop(raw({ temperature: String, humidity: String }))
  '12h': {
    temperature: string;
    humidity: string;
  };

  @Prop(raw({ temperature: String, humidity: String }))
  '19h': {
    temperature: string;
    humidity: string;
  };

  @Prop()
  date: string;

  @Prop()
  heure: string;

  @Prop(raw({ temperature: String, humidity: String }))
  moyenne: {
    temperature: string;
    humidity: string;
  };
}

export const ClimatSchema = SchemaFactory.createForClass(Climat);
