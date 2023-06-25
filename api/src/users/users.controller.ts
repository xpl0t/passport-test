import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.model';

@Controller('users')
export class UsersController {

  @UseGuards(JwtAuthGuard)
  @Get('current')
  public getCurrentUser(@Request() req: Req): User {
    return req.user as User;
  }
}
