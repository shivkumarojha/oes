import { NextFunction, Request, Response } from "express"
import { AdminSchema, AdminType, Role } from "../schemas/admin.schema.js"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export function validateAdminSchema(req: Request, res: Response, next: NextFunction) {
    const parsedData = AdminSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Some error occured",
            error: parsedData.error
        })
    }
    const admin: AdminType = parsedData.data
    if (parsedData.data.role === Role.SUPER) {
        admin.role = Role.SUPER
    }

    req.body = parsedData.data
    next()
}