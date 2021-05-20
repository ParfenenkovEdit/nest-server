import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    user_id: number

    @Column('varchar')
    name: string;

    @Column('varchar')
    mail: string;

    @Column('varchar')
    password: string;

}