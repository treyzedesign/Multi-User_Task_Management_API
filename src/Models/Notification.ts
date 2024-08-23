import Sequelize, { DataTypes } from '@sequelize/core';
import UserModel from './User';
import TaskModel from './Task';

export const NotificationModel = (sequelize: Sequelize) => {
    const User = UserModel(sequelize)
    const Task = TaskModel(sequelize)
    return sequelize.define('Notification', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User, // or the name of your user model
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
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
        tableName: 'Notifications',
    });
};