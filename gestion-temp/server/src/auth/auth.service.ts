import { ConsoleLogger, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  logger = new ConsoleLogger();
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //creation du token pour l'utilisateur
  async login(loginUserDto: LoginUserDto) {
    const payload = await this.userService.login(loginUserDto);
    this.logger.log(payload);
    //signature du token de l'utilisateur
    return { access_token: this.jwtService.sign(payload) };
  }
}
