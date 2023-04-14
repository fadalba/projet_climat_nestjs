import { Module } from '@nestjs/common';
import { ClimatGateway } from './climat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Climat, ClimatSchema } from './entities/climat.entity';
import { ClimatService } from './climat.serv ice';
import { ClimatController } from './climat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Climat.name, schema: ClimatSchema }]),
  ],
  providers: [ClimatGateway, ClimatService],
  controllers: [ClimatController],
  exports: [ClimatService],
})
export class ClimatModule {}
