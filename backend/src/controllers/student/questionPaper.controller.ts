import { Request, Response } from "express";
import prisma from "../../utils/prismaClient.js";
// Get question paper of a particular test
export async function getQuestionPaper(req: Request, res: Response) {
    const testId = req.params.testId
    const studentId = req?.user?.id

    // Check if student has access to the test paper
    try {
        const access = await prisma.enrollForTest.findMany({
            where: {
                testId: Number(testId),
                studentId: Number(studentId)
            }
        })
        console.log(access)
        if (!access) {
            return res.status(404).json({
                message: "You have not access to the test paper",
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }

    try {
        const testQuestions = await prisma.testName.findUnique({
            where: {
                id: Number(testId)
            },
            include: {
                TestQuestion: true
            }
        })
        
        return res.status(200).json({
            message: "Questions fetched successfully",
            questions: testQuestions
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong, try again later",
            error: error
        })
    }
}