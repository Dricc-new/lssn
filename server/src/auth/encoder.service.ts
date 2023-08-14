import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class EncoderService {
    // Encoder password
    async passwordEncoder(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
    }

    // Validate password
    async checkPassword(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword)
    }
}