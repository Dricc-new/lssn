import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { ConfigService } from '@nestjs/config';
import { AccessTokenResponseDTO } from './dto/AccessTokenResponse-dto';
import { UserInfoDTO } from './dto/UserInfo.dto';

@Injectable()
export class AuthlinkedinService {
    constructor(
        private authService: AuthService,
        private readonly httpService: HttpService,
        private env: ConfigService) { }
    // Luego********************************************************
    async encoder(str: string): Promise<string> {
        return str
    }

    // Luego********************************************************
    async decoder(code: string): Promise<string> {
        return code
    }

    async accessToken(code: string) {
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
    
    async getProfile(accessToken: string){
        try{
            const res: AxiosResponse<UserInfoDTO> = await this.httpService.axiosRef.get('https://api.linkedin.com/v2/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            return res.data
        }catch(e){
            throw new InternalServerErrorException()
        }
    }
}
