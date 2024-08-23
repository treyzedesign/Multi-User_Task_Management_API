import Sequelize, { DataTypes } from '@sequelize/core';
import User from './User';
import UserModel from './User';
import TagModel from './Tag';
import db from '../Config/db';
import {dbModel } from '../Interface';


function TaskModel(sequelize:Sequelize){
    const User = UserModel(sequelize)
    const Tag = TagModel(sequelize)

    const Task = sequelize.define("Tasks", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          status: {
            type: DataTypes.ENUM('To-Do', 'In Progress', 'Completed'),
            allowNull: false,
            defaultValue: 'To-Do',
          },
          assignedTo: {
            type: DataTypes.INTEGER,
            references: {
              model: User, // or use UserModel(sequelize).tableName
              key: 'id',
            },
            allowNull: true,
            onDelete: 'SET NULL',
          },
          tagId: {
            type: DataTypes.INTEGER,
            references: {
                model: Tag, // Reference to the Tag model
                key: 'id',
            },
            allowNull: true,
            onDelete: 'SET NULL',
          },
          createdBy: {
            type: DataTypes.INTEGER,
            references: {
              model: User, // or use UserModel(sequelize).tableName
              key: 'id',
            },
            allowNull: false,
            onDelete: 'CASCADE',
          },
        }, {
          timestamps: true,
          tableName: 'Tasks',
    })
    
 
  return Task; 
}
export default TaskModel
