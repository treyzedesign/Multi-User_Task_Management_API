import db from "../Config/db";
import { NewComment } from "../Interface";

export const createComment = async (commentData: NewComment) => {
    const newComment = await db.Comment.create(commentData);
    return newComment;
}
export const getCommentById = async (id:number)=>{
    const Comment = await db.Comment.findByPk(id)
    return Comment
}

export const editContent = async ()=>{
    
}