import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { AccessTokenResponseDTO } from './dto/AccessTokenResponse-dto';
import { HttpService } from '@nestjs/axios';
import { UserInfoLinkedinDTO } from './dto/UserInfoLinkedin.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class OAuth2LinkedinService {
    constructor(private env: ConfigService,
        private readonly httpService: HttpService) { }

    // Mas adelante añadir esta capa de seguridad
    private async encoder(str: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(str, salt)
    }

    // Mas adelante añadir esta capa de seguridad
    private async decode(code: string): Promise<string> {
        if (await bcrypt.compare('login', code)) return 'login'
        else if(await bcrypt.compare('register', code)) return 'register'
        else return ''
    }

    // return link to linkedin
    async getLink(action: string) {
        return 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' +
            this.env.get('LINKEDIN_CLIENT_ID') +
            '&redirect_uri=' + this.env.get('LINKEDIN_CALLBACK') +
            '&state=' + await this.encoder(action) +
            '&scope=' + this.env.get('LINKEDIN_SCOPES')
    }

    // validate the state and if everything is ok return the action of this state
    async stateValidate(state: string) {
        const action = await this.decode(state)
        if (!action) throw new ConflictException('The page has expired, please try again.')
        return action
    }

    // request the accessToken to linkedin
    async getAccessToken(code: string) {
        try {
            const res: AxiosResponse<AccessTokenResponseDTO> = await this.httpService.axiosRef.post('https://www.linkedin.com/oauth/v2/accessToken', {
                code: code,
                grant_type: 'authorization_code',
                client_id: this.env.get('LINKEDIN_CLIENT_ID'),
                client_secret: this.env.get('LINKEDIN_CLIENT_SECRET'),
                redirect_uri: this.env.get('LINKEDIN_CALLBACK')
            }, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })
            return res.data
        } catch (err) {
            throw new InternalServerErrorException()
        }
    }

    // get linkedin user profile
    async getProfile(accessToken: string) {
        try {
            const res: AxiosResponse<UserInfoLinkedinDTO> = await this.httpService.axiosRef.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            return res.data
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
}
