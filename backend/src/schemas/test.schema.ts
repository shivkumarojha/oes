import { z } from "zod"

// Test Category schema
export const TestCategorySchema = z.object({
    categoryName: z.string()
})


// Test Name Schema
export const TestNameSchema = z.object({
    testName: z.string(),
    testPrice: z.number(),
    testTime: z.number(),
    visibility: z.boolean(),
})
// // Test name like JEE exam 2019 and many more
// model TestName {
//   id            Int @id @default (autoincrement())
//   testName      String
//   testPrice     Int
//   testTime      Int
//   visibility    Boolean
//   createdBy     Int
//   admin         Admin @relation(fields: [createdBy], references: [id])
//   categoryId    Int
//   category      TestCategory @relation(fields: [categoryId], references: [id])
//   created_at    DateTime @default (now())
//   updated_at    DateTime @updatedAt
//   TestQuestion  TestQuestion[]
//   testType      TestType
//   EnrollForTest EnrollForTest[]
// }

// // Type of test - Free Paid ONE
// enum TestType {
//     FREE
//   PAID
//   ONE_TIME_ONLY
// }

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
