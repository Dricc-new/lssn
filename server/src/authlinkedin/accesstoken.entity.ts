import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccessToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 1000, unique: true })
    access_token: string

    @Column({  unique: true })
    expires_in: number

    @Column({ length: 100 })
    scope: string
}