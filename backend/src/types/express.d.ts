import express from "express"

// user type 
interface User {
    email: string
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: User
    }
}
