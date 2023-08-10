import { Module } from '@nestjs/common';
import { AuthlinkedinController } from './authlinkedin.controller';
import { AuthlinkedinService } from './authlinkedin.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [HttpModule, AuthModule,ConfigModule],
    controllers: [AuthlinkedinController],
    providers: [AuthlinkedinService]
})
export class AuthlinkedinModule { }
