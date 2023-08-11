import { User } from "src/auth/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthStrategy {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text' })
    access_token: string

    @Column({ unique: true })
    expires_in: number

    @Column({ length: 100 })
    scope: string
}