import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToOne(() => AuthStrategy, { nullable: true })
    @JoinColumn()
    authStrategy: AuthStrategy
}