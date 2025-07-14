import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { OauthUserDto } from '../dto/oauth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'), // ID
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'), // PWD
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'), // 성공 시 URL
      scope: ['email', 'profile'], // 성공 시 받을 데이터
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<OauthUserDto> {
    const { id, emails, displayName } = profile;

    return {
      identifier: id,
      email: emails && emails[0].value,
      name: displayName,
    };
  }
}
