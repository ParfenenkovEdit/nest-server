import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}


    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                user_id: id
            }
        })
    }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const user = new User();

        user.name = createUserDto.name;
        user.mail = createUserDto.mail;
        user.password = createUserDto.password;

        await this.userRepository.insert(user);
        
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        
        Object.keys(updateUserDto).forEach(key => {
            if (updateUserDto[key]) {
                user[key] = updateUserDto[key];
            }
        });

        await this.userRepository.save(user);

        return user;

    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return;
    }
}