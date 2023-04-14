import { CanActivate, ExecutionContext, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwtAuthGuard';
import { Role } from 'src/users/dto/login-user.dto';

export function RoleGuard(role: Role): Type<CanActivate> {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user && user.role) {
        return user.role === role;
      }
      return false;
    }
  }

  return RoleGuardMixin;
}

export default RoleGuard;
