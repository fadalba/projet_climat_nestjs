import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectCredentialsException extends HttpException {
  constructor() {
    super('Email ou mot de passe incorrect', HttpStatus.FORBIDDEN);
  }
}
