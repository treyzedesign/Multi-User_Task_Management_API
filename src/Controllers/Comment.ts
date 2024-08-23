import { NextFunction, Request, Response } from 'express'
import { CommentSchema } from '../Helpers/Validator';
import { createComment, getCommentById } from '../Services/Comment';


export const createNewComment = async (req: Request, res: Response) => {
    try {
        const { content, taskId} = req.body;
        await CommentSchema.validateAsync(req.body).catch((error:any)=>{
            if(error.details[0].message  != null){
                return res.status(400).json({ error: error.details[0].message });
            }
        })
        
        const comment = await createComment({
            content:content,
            createdBy: req.user.id,
            taskId: taskId,
        });
        
        return res.status(201).json({
            result:comment,
            message: "comment posted successfully"
        });
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

export const editComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id ;
        const { content } = req.body;
        const userId = req.user.id; 

        const comment = await getCommentById(Number(commentId));
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        if (comment.createdBy != userId && req.user.role != "Admin") {
            return res.status(403).json({ error: 'Not authorized to edit this comment' });
        }
        comment.content = content;
        await comment.save();

        return res.status(200).json({ 
            message: "comment edited successfully",
            result: comment 
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id; 

        const comment = await getCommentById(Number(commentId));

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.createdBy !== userId && req.user.role != "Admin") {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }

        await comment.destroy();

        return res.status(200).json({ message: 'Comment deleted' });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
