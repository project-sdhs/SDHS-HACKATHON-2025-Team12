import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OauthUserDto } from './dto/oauth-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginException } from './exception/login.exception';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client({
      clientId: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });
  }

  async login(oauthUser: OauthUserDto): Promise<LoginDto> {
    let user = await this.userService.findUserByIdentifier(
      oauthUser.identifier,
    );

    if (user == null) {
      await this.userService.createUser(oauthUser);
      user = await this.userService.findUserByIdentifier(oauthUser.identifier);
    }

    if (user == null) throw new LoginException('cannot find user');

    const accessToken = await this.createAccessToken(oauthUser.identifier);
    const refreshToken = await this.createRefreshToken(oauthUser.identifier);

    await this.userService.updateOrCreateToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      expiresIn: await this.getTokenExpirationTime(),
      refreshToken: refreshToken,
    };
  }

  async createAccessToken(identifier: string): Promise<string> {
    return await this.jwtService.signAsync(
      { identifier },
      { expiresIn: '1h', secret: this.configService.get<string>('SECRET_KEY') },
    );
  }

  async createRefreshToken(identifier: string): Promise<string> {
    return await this.jwtService.signAsync(
      { identifier },
      { secret: this.configService.get<string>('SECRET_KEY') },
    );
  }

  async getTokenExpirationTime(): Promise<number> {
    return DateTime.now().plus({ milliseconds: 3600000 }).toMillis();
  }

  async validateToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.get('SECRET_KEY'),
      });

      const userId = payload.identifier;

      const user = await this.userService.findOneById(userId);

      return user;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}
