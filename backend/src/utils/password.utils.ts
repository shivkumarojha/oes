import bcrypt from "bcrypt"
export const matchPassword = async (password: string, hashPassword: string) => {
    const matched = await bcrypt.compare(password, hashPassword)
    return matched
}