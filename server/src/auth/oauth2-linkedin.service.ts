import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { AccessTokenResponseDTO } from './dto/AccessTokenResponse-dto';
import { HttpService } from '@nestjs/axios';
import { UserInfoLinkedinDTO } from './dto/UserInfoLinkedin.dto';

@Injectable()
export class OAuth2LinkedinService {
    constructor(private env: ConfigService,
        private readonly httpService: HttpService) { }

    private encoder(str: string): string {
        return str
    }

    private decode(code: string): string {
        return code
    }

    // return link to linkedin
    getLink() {
        return 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' +
            this.env.get('LINKEDIN_CLIENT_ID') +
            '&redirect_uri=' + this.env.get('LINKEDIN_CALLBACK') +
            '&state=' + this.encoder('key') +
            '&scope=' + this.env.get('LINKEDIN_SCOPES')
    }

    // validate the state and if everything is ok return the action of this state
    stateValidate(state: string) {
        const action = this.decode(state)
        return true
    }

    // request the accessToken to linkedin
    async getAccessToken(code: string) {
        try {
            const res: AxiosResponse<AccessTokenResponseDTO> = await this.httpService.axiosRef.post('https://www.linkedin.com/oauth/v2/accessToken', {
                code: code,
                grant_type: 'authorization_code',
                client_id: this.env.get('LINKEDIN_CLIENT_ID'),
                client_secret: this.env.get('LINKEDIN_CLIENT_SECRET'),
                redirect_uri: 'http://localhost:5173/callback'
            }, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            })
            return res.data
        } catch (err) {
            throw new InternalServerErrorException()
        }
    }

    // get linkedin user profile
    async getProfile(accessToken: string){
        try{
            const res: AxiosResponse<UserInfoLinkedinDTO> = await this.httpService.axiosRef.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            return res.data
        }catch(e){
            throw new InternalServerErrorException()
        }
    }
}
