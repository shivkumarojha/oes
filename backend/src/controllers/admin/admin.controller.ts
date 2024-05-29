import express from "express"
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const registerAdmin = async (req: Request, res: Response) => {
    console.log("register admin")
    const user = await prisma.admin.create({
        data: {
            email: "hell@gmail.com",
            password: 'fsdf',
            name: "fsdfsd",
            userName: "dfsdfsd"
        }

    })
    console.log(user)
    res.status(200).json({
        message: "user created"
    })
}