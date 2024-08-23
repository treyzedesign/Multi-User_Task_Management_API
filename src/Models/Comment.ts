import Sequelize, { DataTypes } from '@sequelize/core';
import UserModel from './User';
import TaskModel from './Task';

const CommentModel = (sequelize: Sequelize) => {
    const User = UserModel(sequelize)
    const Task = TaskModel(sequelize)

    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
            allowNull: false,
        },
        taskId: {
            type: DataTypes.INTEGER,
            references: {
                model: Task,
                key: 'id',
            },
            allowNull: false,
        },
    }, {
        timestamps: true,
        tableName: 'Comments',
    });

    return Comment;
};

export default CommentModel;