import { number, z } from "zod"

// Test Category schema
export const TestCategorySchema = z.object({
    categoryName: z.string()
})



// Test Type enum
export enum TestType {
    FREE = "FREE",
    PAID = "PAID",
    ONE_TIME_ONLY = "ONE_TIME_ONLY"
}
// Test Name Schema
export const TestNameSchema = z.object({
    testName: z.string(),
    testPrice: z.number(),
    testTime: z.number(),
    marks: z.number(),
    visibility: z.boolean(),
    testType: z.nativeEnum(TestType).default(TestType.PAID),
    categoryId: z.number(),
})



export type TestNameType = z.infer<typeof TestNameSchema>


// Enum for Answer
export enum Answer {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}
// Test Question Schema
export const TestQuestionSchema = z.object({
    question: z.string(),
    questionPic: z.string().optional(),
    answer: z.nativeEnum(Answer),
    options: z.object({
        option1: z.string(),
        option2: z.string(),
        option3: z.string(),
        option4: z.string()
    })
})

//Test Question Type
export type TestQuestionType = z.infer<typeof TestQuestionSchema>

// // Test Questions
// model TestQuestion {
//   id          Int @id @default (autoincrement())
//   testName    Int
//   test        TestName @relation(fields: [testName], references: [id])
//   question    String
//   questionPic String ?
//         answer      Answer
//   Options     Options ?
// }

// model Options {
//   id             Int @id @default (autoincrement())
//   testQuestionId Int @unique
//   testQuestion   TestQuestion @relation(fields: [testQuestionId], references: [id])
//   option1        String
//   option2        String
//   option3        String
//   option4        String
// }

// // answer Enum
// enum Answer {
//     A
//   B
//   C
//   D
// }
