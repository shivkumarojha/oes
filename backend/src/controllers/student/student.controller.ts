import { Request, Response } from 'express';
import { StudentSchema } from '../../schemas/student.schema.js';
import prisma from '../../utils/prismaClient.js';
// student register controller
export async function signup(req: Request, res: Response) {
    const parsedData = StudentSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Provide required fields",
            error: parsedData.error
        })
    }
    try {
        const student = await prisma.student.create({
            data: {
                ...parsedData.data
            }
        })
        return res.status(200).json({
            message: "Student registered successfully",
            student: student
        })
    } catch (error) {
        return res.status(408).json({
            message: "Something went wrong while registering student. Try again.",
            error: error
        })
    }
}