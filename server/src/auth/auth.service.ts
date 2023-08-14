import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from './dto/register-user.dto';
import { EncoderService } from './encoder.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthStrategy } from './authStrategy.entity';
import { AuthStrategyDTO } from './dto/authStrategy.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(AuthStrategy) private authStrategyRepository: Repository<AuthStrategy>,
        private encoderService: EncoderService,
        private jwtService: JwtService) { }

    // Create a new token; and returns an access token with your refresh token
    private async createToken(payload: JwtPayload): Promise<{ accessToken: string, refreshToken: string }> {
        // Create accessToken
        const accessToken = this.jwtService.sign(payload)
        
        // Create a refreshToken
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_KEY_SECRET,
            expiresIn: process.env.REFRESH_KEY_EXPIRE,
        })
        return { accessToken, refreshToken }
    }

    // Refresh accessToken
    async updateToken(accessToken: string, refreshToken: string): Promise<{ accessToken: string }> {
        try {
            // If this token is not expired I return it
            const payload: { id: string, email: string } = await this.jwtService.verify(accessToken)
            return { accessToken }
        } catch{
            try {
                // I verify that the refresh token is not expired
                const { id, email } = await this.jwtService.verifyAsync(refreshToken, {
                    secret: process.env.REFRESH_KEY_SECRET,
                })

                // I create a new token and return it
                const newAccessToken = this.jwtService.sign({ id, email })
                return { accessToken: newAccessToken }
            } catch (err) {
                throw new UnauthorizedException('Your session has expired')
            }
        }
    }

    async registerUser(user: RegisterUserDTO) {
        const { name, email, password, useAuthStrategy } = user;
        
        // Encode Password
        const hashedPassword = await this.encoderService.passwordEncoder(password)
        
        // Create a new User
        const NewUser = this.userRepository.create({ name, email, password: hashedPassword, useAuthStrategy })
        return this.userRepository.save(NewUser).then((user) => {
           
            //if all ok return the user
            return user
        }).catch((e) => {
           
            //else return a error
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('The email already exists in our database.')
            }
            throw new InternalServerErrorException()
        })
    }

    async login(loginUser: LoginUserDTO): Promise<{ accessToken: string, refreshToken: string }> {
        const { email, password } = loginUser

        // Search user by email on database
        const user = await this.userRepository.findOneBy({ email: email })

        // If the user exists and the password is correct, return the account; otherwise return an error
        if (user && (await this.encoderService.checkPassword(password, user.password))) {
            return await this.createToken({ id: user.id, email: user.email })
        } else {
            throw new UnauthorizedException('The wrong email or password')
        }
    }

    async registerUserWithStrategy(user: RegisterUserDTO, strategy: AuthStrategyDTO): Promise<{ accessToken: string, refreshToken: string }> {
        try {
            // register user
            const newUser: User = await this.registerUser(user)

            // create a new strategy
            const { access_token, scope } = strategy
            const date = new Date
            date.setSeconds(strategy.expires_in)
            const newStrategy = this.authStrategyRepository.create({ access_token, scope, expires_in: date })
            newStrategy.user = newUser
            await this.authStrategyRepository.save(newStrategy)

            // return a accessToken
            return await this.createToken({ id: newUser.id, email: newUser.email })
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    // Login with linkedin
    async loginUserWithStrategy(user: User, strategy: AuthStrategyDTO): Promise<{ accessToken: string, refreshToken: string }> {
        // update Strategy
        const { access_token, scope } = strategy
        const date = new Date
        date.setSeconds(strategy.expires_in)

        try {
            await this.authStrategyRepository.update({ user: user }, { access_token, scope, expires_in: date })
        } catch (e) {
            throw new InternalServerErrorException()
        }

        // return tokens
        return await this.createToken({ id: user.id, email: user.email })
    }

    // Get user by email
    getUser(email: string) {
        return this.userRepository.findOneBy({ email: email })
    }

    // generate a random password
    passwordGenerate(): string {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2)
    }
}
