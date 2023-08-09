import { IsNotEmpty, IsString, Length, IsEmail} from "class-validator"

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail() 
    @Length(2, 100)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 100)
    password: string
}