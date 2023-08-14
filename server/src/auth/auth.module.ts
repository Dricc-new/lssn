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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.KEY_SECRET,
      signOptions: {
        expiresIn: process.env.KEY_EXPIRE,
      }
    }),
    TypeOrmModule.forFeature([User, AuthStrategy]),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, JwtStrategy, OAuth2LinkedinService],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule { }
