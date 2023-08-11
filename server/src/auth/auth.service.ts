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
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(AuthStrategy) private authStrategyRepository: Repository<AuthStrategy>,
        private encoderService: EncoderService,
        private jwtService: JwtService) { }

    async registerUser(user: RegisterUserDTO) {
        const { name, email, password } = user;
        //Encode Password
        const hashedPassword = await this.encoderService.passwordEncoder(password)
        //created User
        const NewUser = this.userRepository.create({ name, email, password: hashedPassword })
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

    async login(loginUser: LoginUserDTO): Promise<{ accessToken: string }> {
        const { email, password } = loginUser

        //search user by email on database
        const user = await this.userRepository.findOneBy({ email: email })

        //if the user exists and the password is correct, return the account; otherwise return an error
        if (user && (await this.encoderService.checkPassword(password, user.password))) {
            const payload: JwtPayload = { id: user.id, email: user.email }
            const accessToken = this.jwtService.sign(payload)
            return { accessToken }
        } else {
            throw new UnauthorizedException('The wrong email or password')
        }
    }

    async registerUserWithStrategy(user: RegisterUserDTO, strategy: AuthStrategyDTO) {
        try {
            const newUser: User = await this.registerUser(user)
            const newStrategy = this.authStrategyRepository.create(strategy)
            const saveStrategy = await this.authStrategyRepository.save(newStrategy)
            newUser.authStrategy = saveStrategy
            const saveUser = await this.userRepository.save(newUser)
            return saveUser
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async loginUserWithStrategy(user: User): Promise<{ accessToken: string }> {
        const payload: JwtPayload = { id: user.id, email: user.email }
        const accessToken = this.jwtService.sign(payload)
        return { accessToken }
    }

    getUser(email: string) {
        return this.userRepository.findOneBy({ email: email })
    }
}
