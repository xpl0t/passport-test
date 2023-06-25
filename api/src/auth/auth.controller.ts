import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  public constructor(
    private authService: AuthService
  ) {}

  @Post('login')
  public async login(@Body() dto: LoginDto): Promise<any> {
    return await this.authService.login(dto);
  }

}
