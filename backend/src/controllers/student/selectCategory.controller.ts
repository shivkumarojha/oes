import prisma from "../../utils/prismaClient.js";
import { Request, Response } from "express";


// Show all category to student
export async function showAllCategory(req: Request, res: Response) {
    try {
        const categories = await prisma.testCategory.findMany()
        return res.status(200).json({
            message: "success",
            categories: categories
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error occured while fetching categories",
            error: error
        })
    }
}
// Select category contoller for Student
export function selectCategory(req: Request, res: Response) {
    return res.status(200).json({
        message: "user verified"
    })

} 