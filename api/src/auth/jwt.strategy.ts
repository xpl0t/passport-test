import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtToken } from './jwt-token.model';
import { jwtConfig } from './jwt.config';
import { User } from 'src/users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret
    });
  }

  async validate(token: JwtToken): Promise<User> {
    return await this.userService.get({ id: token.sub });
  }
}
