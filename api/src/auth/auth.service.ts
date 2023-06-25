import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtToken } from './jwt-token.model';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  public constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login({ username, password }: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.get({ username });
    if (user == null || user.password !== password) {
      throw new BadRequestException();
    }

    const payload: JwtToken = { username: username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
