import { NextFunction, Request, Response } from 'express'
import { asssignTagToTask, createNewTag } from '../Services/Tag';

export const createTag = async (req: Request, res: Response) => {
    try {
       
        const tag = await createNewTag(req.body);
        
        return res.status(201).json({
            result:tag,
            message: "task created successfully"
        });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

export const assignTag = async (req: Request, res: Response) => {
    try {
        const { taskId, tagId } = req.body;
        const tag = await asssignTagToTask(taskId, tagId);
        return res.status(201).json({
            result:tag,
            message: "tag has been assigned successfully"
        });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

