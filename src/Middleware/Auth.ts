import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request , Response, NextFunction} from 'express'
import { any, string } from 'joi'
dotenv.config()

declare global {
    namespace Express {
        interface Request {
        user?: any;  // Use the specific type if you have it
        }
    }
}
export const AuthToken = (req:Request,res:Response, next:NextFunction)=>{
        const header = req.headers.authorization as string
        const token = header.split(" ")[1] as string
        try {
            if(!token){
                return res.status(403).json({
                    msg: "forbidden access"
                })
            }else{
                let secret = process.env.ACCESSTOKEN as string
                jwt.verify(token, secret, (err,decode)=>{
                    if(err){
                        return res.status(401).json({
                            error: err,
                            message: "Unauthorized Action"
            
                        })
                    }
                    req.user = decode 
                    next()
                })
            }
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
    
            })
        }
    }

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'Admin') { 
        next();
    } else {
        res.status(403).json({
        message: "Access denied. Admins only.",
        });
    }
    };