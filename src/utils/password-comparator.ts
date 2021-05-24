import * as bcrypt from "bcrypt"

export const comparePasswords = async (userPassword: string, candidatePassword: string): Promise<boolean> => {
    return await bcrypt.compare(candidatePassword, userPassword);
}