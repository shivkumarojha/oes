import { Request, Response } from "express";
import { TestNameSchema, TestNameType, TestType } from "../../schemas/test.schema.js";
import prisma from "../../utils/prismaClient.js";

// add test name for the individual test inside a category
export async function addTestName(req: Request, res: Response) {
    const parsedData = TestNameSchema.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Provide required field",
            error: parsedData.error
        })
    }
    const admin = req.user
    // Type casting
    let id
    if (admin) {
        id = Number(admin.id)
    }

    if (id) {
        try {
            const newTest = await prisma.testName.create({
                data: { ...parsedData.data, createdBy: id }
            })
            return res.status(200).json({
                message: "Test created successfully",
                test: newTest
            })
        } catch (error) {
            return res.status(404).json({
                message: "something went wrong",
                error: error
            })
        }


    }

}

// update test name
export async function updateTestName(req: Request, res: Response) {
    const parsedData = TestNameSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Provide required field",
            error: parsedData.error
        })
    }

    try {
        const updateTest = await prisma.testName.update({
            where: {
                id: Number(req.params.testId)
            },
            data: { ...parsedData.data }
        })
        return res.status(200).json({
            message: "Test updated successfully",
            test: updateTest
        })


    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// delete Test
export function deleteTestName(req: Request, res: Response) {
    const params = req.params.testId
    try {
        const deletedTest = prisma.testName.delete({
            where: {
                id: Number(params)
            }
        })
        return res.status(200).json({
            message: "Test deleted successfully",
            test: deletedTest
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }

}


// Get Test 
export async function getSingleTest(req: Request, res: Response) {
    const testId = req.params.testId
    try {
        const test = await prisma.testName.findUnique({
            where: {
                id: Number(testId)
            }
        })
        console.log(test)
        return res.status(200).json({
            message: "Test",
            test: test
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// Get all Tests
export async function getAllTest(req: Request, res: Response) {
    const testCategoryId = req.params.testCategoryId
    try {
        const tests = await prisma.testName.findMany({
            where: {
                categoryId: Number(testCategoryId)
            }
        })
        return res.status(200).json({
            message: "All tests",
            tests: tests
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })

    }

}

// Set visibily of a particular test - like published or not using bollean
export async function setTestVisibility(req: Request, res: Response) {
    const testId = req.params.testId
    const schema = TestNameSchema.pick({ visibility: true })
    const pasrsedData = schema.safeParse(req.body)
    if (!pasrsedData.success) {
        return res.status(411).json({
            message: "Provide visibility field",
            error: pasrsedData.error
        })
    }
    try {
        const test = await prisma.testName.update({
            where: {
                id: Number(testId)
            },
            data: {
                visibility: Boolean(pasrsedData.data.visibility)
            }
        })
        return res.status(200).json({
            message: "Visibility updated",
            test: test
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }

}
