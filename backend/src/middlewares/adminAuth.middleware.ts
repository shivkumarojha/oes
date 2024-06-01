import jwt, { Secret } from "jsonwebtoken"

import { Request, Response, NextFunction } from "express";
import { createDiffieHellmanGroup } from "crypto";

export default async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            message: "Token doesn't exists"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as any
    console.log(decoded)
    console.log("inside auth")
    req.user = decoded
    console.log(req.user)
    next()
}