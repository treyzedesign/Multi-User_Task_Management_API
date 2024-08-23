import db, { sequelize } from '../Config/db'
import { NewTag, NewTask } from '../Interface';
import TagModel from '../Models/Tag';
import TaskModel from '../Models/Task';
import UserModel from '../Models/User';

export const createNewTag = async (TagData: NewTag) => {
    const newTag = await db.Tag.create(TagData);
    return newTag;
}
export const getAllTags = async ()=>{
    return await db.Tag.findAll({
        include: [
            { model: db.Tag, as: 'creator' },
            { model: db.Tag, as: 'assignee' },
        ]
    });
}
export const asssignTagToTask = async (taskId: number, tagId: number)=>{
    const task = await db.Task.findByPk(taskId);
    if (!task) {
        throw new Error('tag not found');
    }

    task.tagId = tagId;
    await task.save();

    return task;
}
