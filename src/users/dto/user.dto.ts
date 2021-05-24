import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty() id: string;
    @IsNotEmpty() username: string;
    @IsNotEmpty() @IsEmail() mail: string;
}