import { Request, Response } from 'express';
import prisma from '../../utils/prismaClient.js';
import { randomUUID } from 'crypto';
import Razorpay from 'razorpay';
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


// Show all the buyied test
export async function getStudentBuyiedTest(req: Request, res: Response) {
    const studentId = req?.user?.id
    try {
        const enrolledTest = await prisma.enrollForTest.findMany({
            where: {
                studentId: Number(studentId)
            }
        })
        if (!enrolledTest) {
            return res.status(404).json({
                message: "You have not enrolled in any exam"
            })
        }
        return res.status(200).json({
            message: "Fetched buyied test successfully",
            enrolledTest: enrolledTest
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error occured while fetching buyied test",
            error: error
        })
    }
}


// Verification after completing payment: Need to implement this feature after frontend completion

export async function verifyPurchase(req: Request, res: Response) {
    const paymentId = req.query.payment_id
    console.log(paymentId)
    if (!paymentId) {
        return res.status(404).json({
            message: "something went wrong"
        })
    }
    try {

        const razorIntance = new Razorpay({
            key_id: process.env.RAZORPAY_ID as string,
            key_secret: process.env.RAZORPAY_SECRET
        })
        razorIntance.payments.fetch(paymentId as any)
            .then((data) => {
                console.log(data)
                // Todo: Verify the payment and give student access to the course
                return res.status(200).json({
                    message: "Payment verified",
                    data: data
                })
            }
            )
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}