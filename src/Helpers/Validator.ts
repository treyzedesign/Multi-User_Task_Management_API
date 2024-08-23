
import joi from "joi"

export const UserSchema = joi.object({
    name : joi.string().trim().min(3).max(255).required(),
    email : joi.string().email().trim().required(),
    password: joi.string().min(8).trim().regex(/[a-zA-Z0-9]{8,30}/).required(),
    role: joi.string().equal("Admin")
})
export const LoginSchema = joi.object({
    email : joi.string().email().trim().required(),
    password: joi.string().trim().required(),
})

export const TaskSchema = joi.object({
    title: joi.string().trim().regex(/[a-zA-Z0-9]/).required(),
    description: joi.string().trim().regex(/[a-zA-Z0-9]/).required(),
    dueDate: joi.string().required(),
})
export const CommentSchema = joi.object({
    content: joi.string().trim().required(),
    taskId: joi.number().required(),
})