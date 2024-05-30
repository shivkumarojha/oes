import jwt, { Secret } from "jsonwebtoken"

import { Request, Response, NextFunction } from "express";
import { createDiffieHellmanGroup } from "crypto";

export default async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    jwt.verify(token as string, process.env.JWT_SECRET as Secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            })
        }
        // @ts-ignore
        req.user = decoded
        next()
    })
}