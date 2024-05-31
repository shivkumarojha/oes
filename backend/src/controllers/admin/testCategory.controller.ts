import { Request, Response } from "express"
import { TestCategorySchema } from "../../schemas/test.schema.js"
import prisma from "../../utils/prismaClient.js"

// add Test category
export async function addTestCategory(req: Request, res: Response) {
    const parsedData = TestCategorySchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(403).json({
            message: "Provide string for category",
            error: parsedData.error
        })
    }
    const categoryExist = await prisma.testCategory.findUnique({
        where: {
            categoryName: parsedData.data.categoryName
        }
    })

    if (categoryExist) {
        return res.status(401).json({
            message: "This Test Category Already Exists"
        })
    }
    try {
        const category = await prisma.testCategory.create({
            data: {
                categoryName: parsedData.data.categoryName
            }
        })

        return res.status(200).json({
            message: "Category added successfully."
        })

    } catch (error) {
        return res.status(401).json({
            message: "something happend with database connection",
            error: error
        })
    }
}

// update test category
export async function updateTestCategory(req: Request, res: Response) {
    const testId = Number(req.params.id)
    const parsedData = TestCategorySchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(403).json({
            message: "Provide string for category",
            error: parsedData.error
        })
    }

    try {
        const updateCategory = await prisma.testCategory.update({
            where: {
                id: testId
            },
            data: {
                categoryName: parsedData.data.categoryName
            }
        })

        return res.status(200).json({
            message: "Test Category updated"
        })

    } catch (error) {
        return res.status(403).json({
            message: "Some error occured",
            error: error
        })
    }

}
// delete test Category 
export async function deleteTestCategory(req: Request, res: Response) {

    const testId = Number(req.params.id)
    if (!testId) {
        return res.status(403).json({
            message: "Category doesn't exist"
        })
    }
    try {
        const category = await prisma.testCategory.delete({
            where: {
                id: testId
            }
        })
        return res.status(200).json({
            message: "Test Category successfully deleted"
        })
    } catch (error) {
        return res.status(403).json({
            message: "Some error occured",
            error: error
        })
    }
}


// get all test Categories
export async function getAllTestCategories(req: Request, res: Response) {
    try {
        const testCategories = await prisma.testCategory.findMany({})
        return res.status(200).json({
            message: "Success",
            categories: testCategories
        })
    } catch (error) {
        return res.status(403).json({
            message: "Some Error occured",
            error: error
        })
    }
}