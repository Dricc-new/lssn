import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}