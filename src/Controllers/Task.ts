import { NextFunction, Request, Response } from 'express'
import { AssignTask, createTask, getTaskById, UpdateStatus, getAllTasks } from '../Services/Task';
import { stat } from 'fs';
import { TaskSchema } from '../Helpers/Validator';
import { createNotification } from '../Services/Notification';


export const createNewTask = async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate} = req.body;
        await TaskSchema.validateAsync(req.body).catch((error:any)=>{
            if(error.details[0].message  != null){
                return res.status(400).json({ error: error.details[0].message });
            }
        })
        
        const task = await createTask({
            title:title,
            description: description,
            dueDate: new Date(dueDate),
            createdBy: req.user.id,
        });
        
        return res.status(201).json({
            result:task,
            message: "task created successfully"
        });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

export const assignTask = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;
        const updatetask = await AssignTask(taskId, userId)
        const message = `You have been assigned a new task with ID ${taskId}.`;
        await createNotification(userId, taskId, message);
        return res.status(200).json({
            message : "assigned task successfully",
            result: updatetask
        });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateTaskStatus =  async (req: Request, res: Response) => {
    try {
        const { taskId, status } = req.body;
        const findtask = await getTaskById(taskId)
        if (!findtask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        if(findtask.createdBy != req.user.id && req.user.role != "Admin"){
            return res.status(403).json({ error: 'you dont the access rights to update this task' });
        }
        const updatetask = await UpdateStatus(taskId, status)
        return res.status(200).json({
            message : "update task status successfully",
            result: updatetask
        });
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTask = async (req: Request, res: Response) => {
    try {
        const tagName = req.query.tagName as string | undefined;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sortBy = req.query.sortBy as string || 'dueDate'; // Default sort by dueDate
        const order = (req.query.order as 'ASC' | 'DESC') || 'ASC'; // Default order is ASC
        const status = req.query.status as string; // Optional filter by status
        const validPage = Number.isInteger(page) && page > 0 ? page : 1;
        const validLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;
        const { rows: tasks, count }  = await getAllTasks(tagName, page, limit, sortBy, order, status)
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found' });
        }
        return res.status(200).json({
            result: tasks,
            totalItems: count,
            totalPages: Math.ceil(count / validLimit),
            currentPage: validPage,
        });
    } catch (error:any) {
        console.log(error);
        
       return res.status(500).json({ error: error.message});
    }
}