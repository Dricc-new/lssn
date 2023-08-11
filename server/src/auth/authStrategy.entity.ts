import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class AuthStrategy {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text' })
    access_token: string

    @Column({ type: 'int' })
    expires_in: number

    @Column({ length: 100 })
    scope: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User
}