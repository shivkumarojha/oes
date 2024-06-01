import { Request, Response } from "express";
import { TestQuestionSchema } from "../../schemas/test.schema.js";
import prisma from "../../utils/prismaClient.js";
import { createDiffieHellmanGroup } from "crypto";

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
        const questionOptions = await prisma.options.create({
            data: { ...parsedData.data.options, testQuestionId: questionId }
        })
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
export async function updateQuestion(req: Request, res: Response) {
    const questionId = req.params.questionId
    const parsedData = TestQuestionSchema.safeParse(req.body)
    const parsedDataWithoutOptions = TestQuestionSchema.omit({ options: true }).safeParse(req.body)

    if (!parsedData.success || !parsedDataWithoutOptions.success) {
        return res.status(404).json({
            message: "Provide  field",
            error: parsedData.error
        })
    }
    try {
        const updateQuestion = await prisma.testQuestion.update({
            where: {
                id: Number(questionId)
            },
            data: { ...parsedDataWithoutOptions.data }
        })
        const updateOptions = await prisma.options.upsert({
            where: {
                testQuestionId: Number(questionId)
            },
            update: { ...parsedData.data.options },
            create: { ...parsedData.data.options, testQuestionId: Number(questionId) }
        })
        return res.status(200).json({
            message: "Question updated successfully",
            questionId: questionId
        })
    } catch (error) {
        return res.status(404).json({
            message: "Provide required field",
            error: parsedData.error
        })
    }
}
// delete question
export async function deleteQuestion(req: Request, res: Response) {
    // const testId = req.params.testId
    const questionId = req.params.questionId
    try {
        const deleteOptions = await prisma.options.delete({
            where: {
                testQuestionId: Number(questionId)
            },
        })
    } catch (error) {
        // just a log do not return response here
        console.log("Options doesn't exist")
    } try {
        const delelteQuestion = await prisma.testQuestion.delete({
            where: {
                id: Number(questionId)
            },
        })

        return res.status(200).json({
            message: "Question deleted successfully",
            questionId: questionId
        })
    } catch (error) {
        return res.status(404).json({
            message: "Question doesn't exist",
            error: error
        })
    }
}
// Get all question related to a single test paper
export async function getQuestions(req: Request, res: Response) {
    const testId = req.params.testId
    try {
        const questions = await prisma.testQuestion.findMany({
            where: {
                testId: Number(testId)
            },
            select: {
                id: true,
                question: true,
                answer: true,
                Options: true
            }
        })
        return res.status(200).json({
            message: "Question fetched successfully",
            questions: questions
        })
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong",
            error: error
        })
    }
}