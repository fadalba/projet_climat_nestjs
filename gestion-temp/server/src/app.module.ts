import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClimatModule } from './climat/climat.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://msarr:namass20@eventcluster.0xsvy.mongodb.net/tp_framework?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    ClimatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
