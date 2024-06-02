import { StudentTestCategorySchema } from "../../schemas/student.schema.js";
import { TestCategorySchema } from "../../schemas/test.schema.js";
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
export async function selectTestCategory(req: Request, res: Response) {
    const studentId = req?.user?.id
    if (!studentId) {
        return res.status(411).json({
            message: "Unauthorized access"
        })
    }
    const testCategories = StudentTestCategorySchema.safeParse(req.body)
    if (!testCategories.success) {
        return res.status(411).json({
            message: "Provided valid test categories.",
            error: testCategories.error
        })
    }
    const categories = testCategories.data.id.map((i) => {
        return {
            categoryId: i,
            studentId: studentId
        }
    })
    console.log(categories)
    try {
        const createTestCategory = await prisma.selectTestCategory.createMany({
            data: [
                ...categories
            ],
            skipDuplicates: true
        })
        return res.status(200).json({
            message: "Test category added successfully",
            categories: createTestCategory

        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// Get all the categories of a particular student 
export async function getAllStudentTestCategory(req: Request, res: Response) {
    const studentId = req?.user?.id
    if (!studentId) {
        return res.status(411).json({
            message: "Unauthorized access"
        })
    }

    try {
        const testCategories = await prisma.selectTestCategory.findMany({
            where: {
                studentId: studentId
            }
        })
        return res.status(200).json({
            message: "Successfully find categories of student",
            testCategories: testCategories
        })
    } catch (error) {
        return res.status(401).json({
            message: "Some error occured",
            error: error
        })
    }
}