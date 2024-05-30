import express from "express"
import { Request, Response } from "express"
import { Admin } from "@prisma/client"
import { AdminType, AdminSchema, Role } from "../../schemas/admin.schema.js"

import prisma from '../../utils/prismaClient.js'

export const registerAdmin = async (req: Request, res: Response) => {
    const validatedAdmin: AdminType = req.body

    // check if admin exists or not
    const admin = await prisma.admin.findUnique({
        where: {
            email: validatedAdmin.email
        }
    })
    if(admin) {
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
export function loginAdmin(req: Request, res: Response) {

}

// For update Admin
export function updateAdmin(req: Request, res: Response) {

}

// for changing admin password
export function changePassword(req: Request, res: Response) {

}


