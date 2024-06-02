import { Request, Response, NextFunction } from 'express';
// Auth middleware for student
export default function studentAuthMiddlreware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({
            message: "Provide authorization token"
        })
    }
}