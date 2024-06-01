import jwt, { Secret } from "jsonwebtoken"

export interface Payload {
        id: number,
        email: string
}

export async function generateJwtToken(payload: Payload, secret: Secret) {
    const token = jwt.sign(payload, secret , { expiresIn: "2 days"})
    return token
} 