import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwtStrategy';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
