import { Request, Response } from 'express';
import { StudentLoginSchema, StudentSchema } from '../../schemas/student.schema.js';
import prisma from '../../utils/prismaClient.js';
import { generateJwtToken } from '../../utils/jwt.utils.js';
import { Secret } from 'jsonwebtoken';
import { hashPassword, matchPassword } from '../../utils/password.utils.js';
import { decrypt } from 'dotenv';
// student register controller
export async function signup(req: Request, res: Response) {
    const parsedData = StudentSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Provide required fields",
            error: parsedData.error
        })
    }
    const password = parsedData.data.password
    const hashedPassword = await hashPassword(password)
    parsedData.data.password = hashedPassword

    try {
        const studentExist = await prisma.student.findUnique({
            where: {
                email: parsedData.data.email
            }
        })
        if (studentExist) {
            return res.status(409).json({
                message: "Student already exists"
            })
        }
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

// Login user
export async function signin(req: Request, res: Response) {
    const parsedData = StudentLoginSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Please provide email and password",
            error: parsedData.error
        })
    }
    const { email, password } = parsedData.data
    try {
        const student = await prisma.student.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        if (!student) {
            return res.status(404).json({
                message: "Email not found, Kindly register!"
            })
        }
        const matchedPassword = await matchPassword(password, student.password)
        if (!matchedPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        const jwtToken = await generateJwtToken({ id: student.id, email: student.email }, process.env.JWT_SECRET as Secret)
        return res.status(200).json({
            message: "Login successful",
            token: jwtToken
        })
    } catch (error) {

    }

}