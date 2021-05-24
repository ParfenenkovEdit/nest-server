import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import {hash} from 'bcrypt';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })

    username: string;
    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })

    password: string;
    @Column({
        type: 'varchar',
        length: 24,
        nullable: false
    })

    mail: string;
    @BeforeInsert() async hashPassword() {
        this.password = await hash(this.password, 10);
    }

}