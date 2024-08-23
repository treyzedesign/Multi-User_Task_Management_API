import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import UserModel from '../Models/User';
import TaskModel from '../Models/Task';
import TagModel from '../Models/Tag';
import { dbModel } from '../Interface';
import CommentModel from '../Models/Comment';
import { NotificationModel } from '../Models/Notification';
import dotenv from 'dotenv'
dotenv.config()

let Port =  process.env.DB_PORT as string
export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: `${process.env.DATABASE}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    host: 'localhost',
    port: Number(Port),
    ssl: false,
    clientMinMessages: 'notice',
    
  });
const db = {} as dbModel
db.User = UserModel(sequelize)
db.Task = TaskModel(sequelize)
db.Tag = TagModel(sequelize)
db.Comment = CommentModel(sequelize)
db.Notification = NotificationModel(sequelize)
db.Task.belongsTo(db.User, { as: 'creator', foreignKey: 'createdBy' });
db.Task.belongsTo(db.User, { as: 'assignee', foreignKey: 'assignedTo' });
db.Task.belongsTo(db.Tag, {as: "tag", foreignKey: "tagId"})

db.User.hasMany(db.Comment, { foreignKey: 'createdBy', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'createdBy', as: 'creator' });

db.Task.hasMany(db.Comment, { foreignKey: 'taskId', as: 'comments' });
db.Comment.belongsTo(db.Task, { foreignKey: 'taskId', as: 'task' });

sequelize.sync({ alter: true });

export default db;