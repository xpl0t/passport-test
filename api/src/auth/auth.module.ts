import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard
  ],
  controllers: [AuthController]
})
export class AuthModule {}
