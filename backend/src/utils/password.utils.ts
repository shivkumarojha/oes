import bcrypt from "bcrypt"
export const matchPassword = async (password: string, hashPassword: string) => {
    const matched = await bcrypt.compare(password, hashPassword)
    return matched
}

export const hashPassword = async (password: string) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}