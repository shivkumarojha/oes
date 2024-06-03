import { Request, Response } from 'express';
import prisma from '../../utils/prismaClient.js';
import { randomUUID } from 'crypto';

// Get all the test related to the category
export async function getTestByCategory(req: Request, res: Response) {
    const testCategoryId = req.params.testCategoryId
    try {
        const tests = await prisma.testName.findMany({
            where: {
                categoryId: Number(testCategoryId)
            }
        })
        return res.status(200).json({
            message: "Fetched Tests successfully",
            tests: tests
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error occured while fetching tests",
            error: error
        })
    }
}

// Enroll for free test
export async function enrollForFreeTest(req: Request, res: Response) {
    const studentId = req?.user?.id
    const testId = req.params.testId
    try {
        const isCourseFree = await prisma.testName.findUnique({
            where: {
                id: Number(testId)
            },
            select: {
                testType: true,
                categoryId: true,
            }
        })
        if (isCourseFree?.testType == 'FREE') {
            // Enroll  Student for free test
            const enrollStudent = await prisma.enrollForTest.create({
                data: {
                    testId: Number(testId),
                    studentId: Number(studentId),
                    categoryId: Number(isCourseFree.categoryId),
                    testType: isCourseFree.testType
                }
            })
            // Add payment details
            const payementIntentId = randomUUID()
            const addOrder = await prisma.order.create({
                data: {
                    enrolledId: enrollStudent.id,
                    studentId: Number(studentId),
                    testId: Number(testId),
                    paymentIntentId: enrollStudent.studentId + " " + payementIntentId,
                    paymentStatus: "COMPLETED",
                    paymentAmount: 0,
                    paymentMethod: 'OTHER'
                }
            })
            return res.status(200).json({
                message: "Enrolled for test successfully",
                enrolled: enrollStudent,
                addOrder: addOrder
            })
        } else {
            return res.status(411).json({
                message: "Test is not free"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error occured while enrolling for test",
            error: error
        })
    }


}
// Buy the test
// Show all the buyied test


// list all the test related to student
