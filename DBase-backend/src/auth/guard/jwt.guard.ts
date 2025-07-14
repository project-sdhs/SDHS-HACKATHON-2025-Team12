import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();

      const accessToken = request.cookies['accessToken'];

      if (!accessToken) {
        throw new UnauthorizedException('Authorization token missing');
      }

      try {
        const user = this.authService.validateToken(accessToken);

        request.user = user;
      } catch (e) {
        throw new UnauthorizedException('Invalid token');
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
