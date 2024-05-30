import express from "express"
import { Request, Response } from "express"
import { Admin } from "@prisma/client"
import { AdminType, AdminSchema, Role, AdminLoginSchema, UpdateAdminSchema } from "../../schemas/admin.schema.js"

import prisma from '../../utils/prismaClient.js'
import { generateJwtToken } from "../../utils/jwt.utils.js"
import { Secret } from "jsonwebtoken"
import { matchPassword } from "../../utils/password.utils.js"

export const registerAdmin = async (req: Request, res: Response) => {
    const validatedAdmin: AdminType = req.body

    // check if admin exists or not
    const admin = await prisma.admin.findUnique({
        where: {
            email: validatedAdmin.email
        }
    })
    if (admin) {
        return res.status(301).json({
            message: "Admin already Exists!!!"
        })
    }
    // Create Admin
    const adminUser = await prisma.admin.create({
        data: { ...validatedAdmin }
    })
    res.status(200).json({
        message: "Admin created",
        user: adminUser
    })

}

// for Login Admin
export async function loginAdmin(req: Request, res: Response) {
    const parsedData = AdminLoginSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Please provide right values",
            error: parsedData.error
        })
    }

    const email = parsedData.data.email
    const password = parsedData.data.password

    // find if user exist
    const admin = await prisma.admin.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            password: true
        }
    })
    if (!admin) {
        return res.status(411).json({
            message: "Admin doesn't exist"
        })
    }

    // Check for password 
    const isPasswordOk = await matchPassword(password, admin.password)

    if (isPasswordOk) {
        // create jwt token and send it back
        const token = await generateJwtToken({ email: admin.email }, process.env.JWT_SECRET as Secret)
        console.log(token)
        res.status(200).json({
            message: "Logged in",
            token: token
        })
    } else {
        return res.status(411).json({
            message: "Password didn't matched"
        })
    }

}

// For update Admin
export async function updateAdmin(req: Request, res: Response) {
    // @ts-ignore
    const email = req.user.email
    const parsedData = UpdateAdminSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(403).json({
            message: "Please provide required values",
            error: parsedData.error
        })
    }

    const admin = await prisma.admin.update({
        where: {
            email: email
        },
        data: {
            userName: parsedData.data.userName,
            name: parsedData.data.name,
            profilePic: parsedData.data.profilePic
        }
    })
    if (!admin) {
        return res.status(304).json({
            message: "Admin user doesn't exists",

        })
    }
    return res.status(200).json({
        message: "Successfull updated",
        updatedAdmin: admin
    })

}

// for changing admin password
export function changePassword(req: Request, res: Response) {

}


