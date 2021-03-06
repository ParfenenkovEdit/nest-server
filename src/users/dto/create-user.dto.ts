import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty() username: string;
    @IsNotEmpty() @IsEmail() mail: string;
    @IsNotEmpty() password: string;
}