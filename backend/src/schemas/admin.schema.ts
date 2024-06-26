import { emitWarning } from "process"
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

export const AdminLoginSchema = AdminSchema.pick({ email: true, password: true }).strict()


export type AdminLoginType = z.infer<typeof AdminLoginSchema>
export type AdminType = z.infer<typeof AdminSchema>

// Update admin Schema
export const UpdateAdminSchema = z.object({
    name: z.string().optional(),
    userName: z.string({ message: "User must be lowercase " }).toLowerCase().optional(),
    profilePic: z.string().url({ message: "Profile pic must be an url" }).optional()
})

// Check both password(current and new) update password schema
export const CheckAdminPasswordSchema = AdminSchema.pick({
    password: true
})
    .extend({
        newPassword: z.string().min(6, "Password must be 6 char or more!"),
        confirmPassword: z.string().min(6, "Password must be 6 char or more!")
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password dont't match",
        path: ['confirmPassword']
    })

export type UpdateAdminSchema = z.infer<typeof UpdateAdminSchema>