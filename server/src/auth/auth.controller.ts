import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { OAuth2LinkedinService } from './oauth2-linkedin.service';
import { AccessTokenDTO } from './dto/AccessToken-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private oauth2LinkedinService: OAuth2LinkedinService) {
    }

    @Post('/register')
    async register(@Body() user: RegisterUserDTO) {
        return await this.authService.registerUser(user)
    }

    @Post('/login')
    async login(@Body() user: LoginUserDTO) {
        return await this.authService.login(user)
    }

    // Returns a route to authenticate with linkedin
    @Get('/oauth2/linkedin')
    getOAuth2Linkedin() {
        return this.oauth2LinkedinService.getLink()
    }


    @Post('/oauth2/linkedin')
    async OAuth2Linkedin(@Body() request: AccessTokenDTO) {
        try {
            this.oauth2LinkedinService.stateValidate(request.state)
            const resToken = await this.oauth2LinkedinService.getAccessToken(request.code)
            const profile = await this.oauth2LinkedinService.getProfile(resToken.access_token)
            const user = await this.authService.getUser(profile.email)
            if (user) {
                return await this.authService.loginUserWithStrategy(user)
            } else {
                const newUser = { name: profile.name, email: profile.email, password: 'Qwe123asd' }
                const rUser = await this.authService.registerUserWithStrategy(newUser, resToken)
                return await this.authService.loginUserWithStrategy(rUser)
            }
        } catch (err) {
            return 'error'
        }
    }

}
