import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import {hash} from 'bcrypt';

@Entity()
export class UserEntity {

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: 'varchar',
        length: 15,
        nullable: false
    })
    username: string;
    
    @Column({
        type: 'varchar',
        length: 150,
        nullable: false
    })
    password: string;
    

    mail: string;
    @BeforeInsert() async hashPassword() {
        const newpass = await hash(this.password, 10);
        console.log(newpass);
        this.password = newpass;
    }

}