import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

// Auth middleware for student
export default function studentAuthMiddlreware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            message: "Provide authorization token"
        })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            message: "Token is not provided or Invalid token"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as any

    if (!decoded) {
        return res.status(411).json({
            message: "Invalid token"
        })
    }
    req.user = decoded
    next()
}