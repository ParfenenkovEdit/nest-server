import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { toUserDto } from "./dto/toUserDto";
import { UserDto } from "./dto/user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { comparePasswords } from "../utils/password-comparator";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}


    async getAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find();

        return users.map(toUserDto);
    }

    async findOne(options?: object): Promise<UserEntity> {
        const user = await this.userRepository.findOne(options);
        return user;
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username }});

        if(!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await comparePasswords(user.password, password);
        if (!areEqual) {
            throw new HttpException('Invalid credenticals', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({
            where: { username }
        })
    }

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const { username, password, mail } = createUserDto;

        const userInDb = await this.findOne({ where: { username }});
        
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepository.create({ username, password, mail });
        await this.userRepository.save(user);

        return toUserDto(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const user = await this.findOne({ id });
        
        Object.keys(updateUserDto).forEach(key => {
            if (updateUserDto[key]) {
                user[key] = updateUserDto[key];
            }
        });

        await this.userRepository.save(user);

        return toUserDto(user);

    }

    async remove(id: string) {
        const user = await this.findOne({ id });
        await this.userRepository.remove(user);
        return;
    }
}