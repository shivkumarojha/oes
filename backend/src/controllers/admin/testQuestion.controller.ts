import { Request, Response } from "express";
import { TestQuestionSchema } from "../../schemas/test.schema.js";
import prisma from "../../utils/prismaClient.js";

// add test question
export async function addQuestion(req: Request, res: Response) {
    const parsedData = TestQuestionSchema.safeParse(req.body)
    const parsedDataWithoutOptions = TestQuestionSchema.omit({ options: true }).safeParse(req.body)
    const testId = req.params.testId

    if (!parsedData.success || !parsedDataWithoutOptions.success) {
        return res.status(411).json({
            message: "Provide required field",
            error: parsedData.error
        })
    }

    try {
        const newQuestion = await prisma.testQuestion.create({
            data: { ...parsedDataWithoutOptions.data, testId: Number(testId) },
            select: {
                id: true,
                question: true,
                Options: true
            }
        })

        const questionId = newQuestion.id
        console.log(questionId)
        console.log(newQuestion)
        const questionOptions = await prisma.options.create({
            data: { ...parsedData.data.options, testQuestionId: questionId }
        })
        console.log(questionOptions)
        return res.status(200).json({
            message: "Question added successfully",
            questionId: questionId
        })

    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// update test question
export function updateQuestion(req: Request, res: Response) {

}
// delete question
export function deleteQuestion(req: Request, res: Response) {

}

// Get all question related to a single test paper
export function getQuestions(req: Request, res: Response) {

}