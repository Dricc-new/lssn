import { Body, ConflictException, Controller, Get, Param, Post, UseGuards , Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { OAuth2LinkedinService } from './oauth2-linkedin.service';
import { AccessTokenDTO } from './dto/AccessToken-dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    @Get('/oauth2/linkedin/:action')
    getOAuth2Linkedin(@Param() params: { action: string }) {
        return this.oauth2LinkedinService.getLink(params.action)
    }

    @Post('/oauth2/linkedin')
    async OAuth2Linkedin(@Body() request: AccessTokenDTO) {
        try {
            const action = this.oauth2LinkedinService.stateValidate(request.state)
            
            const resToken = await this.oauth2LinkedinService.getAccessToken(request.code)
            const profile = await this.oauth2LinkedinService.getProfile(resToken.access_token)
            const user = await this.authService.getUser(profile.email)
            if (action == 'register') {
                // Verified that the user does not exist
                if (user) throw new ConflictException('The email already exists in our database.')

                // Register user and login
                const newUser = { name: profile.name, email: profile.email, password: this.authService.passwordGenerate() }
                const rUser = await this.authService.registerUserWithStrategy(newUser, resToken)
                return await this.authService.loginUserWithStrategy(rUser)
            } else if (action == 'login') {

                // Verified that the user exist
                if (!user) throw new ConflictException('The email does not exist in our database.')
                
                // Start user session
                return await this.authService.loginUserWithStrategy(user)
            } else{
                throw new ConflictException('The email already exists in our database.')
            }
        } catch (err) {
            return err
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/profile')
    getProfile(@Request() req:any){
        return req
    }
}
