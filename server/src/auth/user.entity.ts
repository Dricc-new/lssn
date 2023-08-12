import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthStrategy } from "./authStrategy.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 100 })
    name: string

    @Column({ length: 100, unique: true })
    email: string

    @Column({ length: 100 })
    password: string

    @Column({ length: 20, nullable: true , name: 'use_auth_strategy'})
    useAuthStrategy: string

    @OneToOne(() => AuthStrategy, (authStrategy) => authStrategy.user)
    authStrategy: AuthStrategy
}