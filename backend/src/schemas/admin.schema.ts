import { z } from "zod"

// Role enum
export enum Role {
    ADMIN = 'ADMIN',
    SUPER = 'SUPER'
}

export const AdminSchema = z.object({
    email: z.string().email({ message: "Invalid Email address" }),
    password: z.string().min(6, { message: "Password can't be less than 6 character" }),
    name: z.string({ message: "Name is required" }),
    userName: z.string({ message: "User must be lowercase " }).toLowerCase(),
    role: z.nativeEnum(Role).default(Role.ADMIN),
    profilePic: z.string().url({ message: "Profile pic must be an url" }).optional()
})

export type AdminType = z.infer<typeof AdminSchema>



// model Admin {
//   id         Int @id @default (autoincrement())
//   email      String @unique @db.VarChar(50)
//   password   String @db.VarChar(200)
//   name       String @db.VarChar(50)
//   userName   String @unique @db.VarChar(50)
//   role       Role @default (ADMIN)
//   profilePic String ?
//         TestName   TestName[]
// }
