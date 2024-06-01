import express from "express"

// user type 
interface User {
    id: number,
    email: string
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: User
    }
}
