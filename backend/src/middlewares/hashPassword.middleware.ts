import bcrypt from "bcrypt"
import { Request, Response, NextFunction } from "express"

export async function hashPasswordMiddleware(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const saltRounds = 10
    const password = data.password
    const hashPassword = await bcrypt.hash(password, saltRounds)
    console.log(hashPassword)
    data.password = hashPassword
    req.body = data
    next()
}