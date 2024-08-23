import { NextFunction, Request, Response } from 'express'
import { createUser, getUserByEmail, UpdateRole } from '../Services/User';
import {UniqueConstraintError} from "@sequelize/core"
import { UserSchema, LoginSchema } from '../Helpers/Validator';
import { hash, compare } from 'bcryptjs'
import { GenerateAccessToken } from '../Helpers/Utils';
import { NewUser } from '../Interface';
import { resourceUsage } from 'process';

export const Register = async (req:Request,res:Response)=>{
    try{
        const {name, email, password, role} = req.body
        await UserSchema.validateAsync(req.body)
        const createdUsers = await createUser({
            name: name,
            email : email,
            password : await hash(password, 10),
            role: role
        })
        res.status(201).json({
            message: "user created successfully",
            result: createdUsers
        });
      } catch (error:any) {
        console.log(error);
        if(error instanceof UniqueConstraintError){
            res.status(409).json({ message: "email already exist"});
        }
        else if(error.details[0].message  != null){
            res.status(400).json({ error: error.details[0].message });
        }
        else{
            res.status(500).json({ statusCode: 500, error: error.message });
        }
      
    };
}

export const Login = async (req:Request,res:Response)=>{
    try {
        await LoginSchema.validateAsync(req.body).catch((error:any)=>{
            if(error.details[0].message  != null){
                res.status(400).json({ error: error.details[0].message });
            }
        })
        const findUser = await getUserByEmail(req.body.email) 
        if(!findUser){
            return res.status(404).json({message: "Invalid credentials"})
        }
        const comparedPassword = await compare(req.body.password, findUser.password)
        if(!comparedPassword){
            return res.status(404).json({message: "Invalid credentials"})
        }
        return res.status(200).json({
            token: GenerateAccessToken({id:findUser.id,role: findUser.role, email: findUser.email}),
            message: "User logged in succesfully",
            result: findUser
        })
    } catch (error:any) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
}

export const AssignRole = async (req:Request,res:Response)=>{
    const userId= req.params.id
    try {
        let updatedRole = await UpdateRole(req.body.role, Number(userId))
        return res.status(200).json({
            message: "user role has been updated",
            result : updatedRole
        })
    } catch (error:any) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
}