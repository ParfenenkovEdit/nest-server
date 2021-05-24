import { UserEntity } from "../entities/user.entity";
import { UserDto } from "./user.dto";

export const toUserDto = (data: UserEntity): UserDto => {
    const { password, ...userDto } = data;

    return userDto;
}