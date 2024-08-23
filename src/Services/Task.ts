import db, { sequelize } from '../Config/db'
import { NewTask } from '../Interface';
import TagModel from '../Models/Tag';
import TaskModel from '../Models/Task';
import UserModel from '../Models/User';
import { createNotification } from './Notification';

export const createTask = async (TaskData: NewTask) => {
    const newUser = await db.Task.create(TaskData);
    return newUser;
}
export const getAllTasks = async (tag?:string, page?: number, limit?: number, sortBy?: string, order?: 'ASC' | 'DESC',status? : string)=>{
    if (tag) {
    }
    const where: any = {};
    if (status) {
        where.status = status;
    }
    return await db.Task.findAndCountAll({
        where,
        // Population
        include: [
            { model: db.User, as: 'creator' },
            { model: db.User, as: 'assignee' },
            {
                model: db.Tag,
                as: 'tag',
                attributes: ["name"], 
                required: !!tag, // Only include tasks if filtering by tag
                where: tag ? { name: tag } : undefined,
            },
            {model: db.Comment, as: "comments"},
        ],
        // Sorting
        order: [[sortBy, order]], 
        limit, 
        offset: (Number(page) - 1) * Number(limit), 
    });
}

export const getTaskById = async (id:number)=>{
    const Task = await db.Task.findByPk(id)
    return Task
}
export const AssignTask = async (taskId: number, userId: number)=>{
 
        const task = await db.Task.findByPk(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        task.assignedTo = userId;
        await task.save();
        const message = `Your task with ID ${taskId} has been assigned to user ${userId}.`;
        await createNotification(task.createdBy, taskId, message)
        return task;
    
} 
export const UpdateStatus = async (taskId: number, status: string)=>{
    return await db.Task.update({status:status}, {
        where: {
            id: taskId
        }
    })
} 