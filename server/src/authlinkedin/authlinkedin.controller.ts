import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthlinkedinService } from './authlinkedin.service';
import { ConfigService } from '@nestjs/config';
import { AccessTokenDTO } from './dto/AccessToken-dto';

@Controller('auth/linkedin')
export class AuthlinkedinController {
    constructor(private authLinkedin: AuthlinkedinService, private env: ConfigService) { }

    @Get(':action')
    async auth(@Param() params: any) {
        return {
            url: 'https://www.linkedin.com/oauth/v2/authorization',
            response_type: 'code',
            client_id: this.env.get('LINKEDIN_CLIENT_ID'),
            state: await this.authLinkedin.encoder(params.action),
            scope: this.env.get('LINKEDIN_SCOPES')
        }
    }

    @Post('/accessToken')
    async accessToken(@Body() request: AccessTokenDTO) {
        // Mas adelante para añadir capa de seguridad
        const state = await this.authLinkedin.decoder(request.state)
        const res = await this.authLinkedin.accessToken(request.code)
        const accessToken = res.access_token
        console.log(accessToken)

    }

    @Get('/profile/:token')
    async getProfile(@Param() params: any) {
        return await this.authLinkedin.getProfile(params.token)
    }
}
