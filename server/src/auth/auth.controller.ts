import { Body, ConflictException, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
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

    // Register a new user
    @Post('/register')
    async register(@Body() user: RegisterUserDTO) {
        return await this.authService.registerUser(user)
    }

    // Log in
    @Post('/login')
    async login(@Body() user: LoginUserDTO) {
        return await this.authService.login(user)
    }

    // Returns a route to authenticate with linkedin
    @Get('/oauth2/linkedin/:action')
    async getOAuth2Linkedin(@Param() params: { action: string }) {
        return await this.oauth2LinkedinService.getLink(params.action)
    }

    @Post('/oauth2/linkedin')
    async OAuth2Linkedin(@Body() request: AccessTokenDTO) {
        try {
            // Extra security layer
            const action = await this.oauth2LinkedinService.stateValidate(request.state)

            // I ask for a Linkedin access token
            const resToken = await this.oauth2LinkedinService.getAccessToken(request.code)

            // I ask for the user's data and look for it in our database
            const profile = await this.oauth2LinkedinService.getProfile(resToken.access_token)
            const user = await this.authService.getUser(profile.email)

            if (action == 'register') {
                // Verified that the user does not exist
                if (user) throw new ConflictException('The email already exists in our database.')

                // Register user
                const newUser = { name: profile.name, email: profile.email, password: this.authService.passwordGenerate(), useAuthStrategy: 'linkedin' }
                return await this.authService.registerUserWithStrategy(newUser, resToken)
            } else if (action == 'login') {

                // Verified that the user exist
                if (!user) throw new ConflictException('The email does not exist in our database.')

                // Verified startegy
                if (user.useAuthStrategy != 'linkedin') throw new ConflictException('We are sorry, but this linkedin account is not found in our database  ')

                // Start user session
                return await this.authService.loginUserWithStrategy(user, resToken)
            } else {
                throw new ConflictException('The email already exists in our database.')
            }
        } catch (err) {
            return err
        }
    }

    // Update accessToken
    @Post('/refreshToken')
    async UpdateToken(@Body() request: { accessToken: string, refreshToken: string }): Promise<{ accessToken: string }> {
        return await this.authService.updateToken(request.accessToken, request.refreshToken)
    }

    // Get linkedin profile
    @UseGuards(JwtAuthGuard)
    @Post('/profile')
    async getProfile(@Request() req: any) {
        return await this.oauth2LinkedinService.getProfile(req.user.authStrategy.access_token)
    }
}
