require('dotenv').config();
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import {
  PickcookUserSigninPayload,
  PlatformUserSigninPayload,
  UserType,
} from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * validate user
   * @param payload
   */
  async validate(payload: PlatformUserSigninPayload): Promise<any> {
    let user;
    // if (payload.userType === UserType.PICKCOOK_USER) {
    //   user = await this.authService.validatePickcookUserById(payload._id);
    // }
    if (payload.userType === UserType.ADMIN) {
      user = await this.authService.validatePlatforAdminById(payload._id);
    }
    return user;
  }
}
