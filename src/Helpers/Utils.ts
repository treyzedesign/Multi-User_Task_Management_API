import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export function GenerateAccessToken(payload:object){
    let secret = process.env.ACCESSTOKEN as string
    let token = jwt.sign(payload, secret, {
        expiresIn: '7d'
    })         
    return token
}

