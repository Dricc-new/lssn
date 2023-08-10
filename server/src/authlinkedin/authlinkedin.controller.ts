import { Controller, Get, Post } from '@nestjs/common';
import { AuthlinkedinService } from './authlinkedin.service';
import { ConfigService } from '@nestjs/config';

@Controller('authlinkedin')
export class AuthlinkedinController {
    constructor(private authLinkedin: AuthlinkedinService, private env: ConfigService) { }

    @Get()
    async auth() {
        return {
            url: 'https://www.linkedin.com/oauth/v2/authorization',
            response_type: 'code',
            client_id: this.env.get('LINKEDIN_CLIENT_ID'),
            state: 'keygenerated',
            scope: this.env.get('LINKEDIN_SCOPES')
        }
    }

    @Post('/register')
    async register() {

    }

    @Post('/login')
    async login() {

    }
}
