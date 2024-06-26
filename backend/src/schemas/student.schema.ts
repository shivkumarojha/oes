import { number, z } from "zod"

// Student Schema
export const StudentSchema = z.object({
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password can't be less than 6 character" }),
    name: z.string({ message: "Name is required" }),
    userName: z.string({ message: "User must be lowercase " }).toLowerCase(),
    profilePic: z.string().url({ message: "Profile pic must be an url" }).optional()
})


// Login Schema
export const StudentLoginSchema = StudentSchema.pick({ email: true, password: true }).strict()


// Test Category Schema
export const StudentTestCategorySchema = z.object({
    id: z.array(z.number())
}) 