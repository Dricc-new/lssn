import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthlinkedinService } from './authlinkedin.service';
import { ConfigService } from '@nestjs/config';
import { AuthLinkedinInitDTO } from './dto/AuthLinkedinInit-dto';

@Controller('auth/linkedin')
export class AuthlinkedinController {
    constructor(private authLinkedin: AuthlinkedinService, private env: ConfigService) { }

    @Get(':action')
    async auth(@Param() params: any ) {
        return {
            url: 'https://www.linkedin.com/oauth/v2/authorization',
            response_type: 'code',
            client_id: this.env.get('LINKEDIN_CLIENT_ID'),
            state: params.action,
            scope: this.env.get('LINKEDIN_SCOPES')
        }
    }

    @Post()
    async init(@Body() request: AuthLinkedinInitDTO) {
        if(request.state == 'register'){

        }else if(request.state == 'login'){

        }else return
    }

}
