import express from "express"
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const registerAdmin = async (req: Request, res: Response) => {
    console.log("register admin")
    res.status(200).json({
        message: "user created"
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


