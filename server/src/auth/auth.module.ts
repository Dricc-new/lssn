import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EncoderService } from './encoder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthStrategy } from './authStrategy.entity';
import { OAuth2LinkedinService } from './oauth2-linkedin.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([User, AuthStrategy]),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy, OAuth2LinkedinService],
  exports: [JwtStrategy, PassportModule, AuthService]
})
export class AuthModule { }
