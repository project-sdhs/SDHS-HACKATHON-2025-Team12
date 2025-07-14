import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google/google.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/decorator/user.decorator';
import { OauthUserDto } from './dto/oauth-user.dto';
import { LoginException } from './exception/login.exception';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async auth() {
    return HttpStatus.OK;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async authCallback(@User() user: OauthUserDto, @Res() response: Response): Promise<void> {
    try {
      const { accessToken, refreshToken } = await this.authService.login(user);

      response.cookie('accessToken', accessToken, {
        maxAge: 3600000, // 1 hour
      });

      response.cookie('refreshToken', refreshToken);

      response.redirect('http://localhost:5173'); // 다시 돌아올 경로

    } catch (error) {
      console.error(error);

      if (error instanceof LoginException) {
        throw new InternalServerErrorException('login Failed');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
