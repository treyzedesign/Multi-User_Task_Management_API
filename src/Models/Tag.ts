import Sequelize, { DataTypes } from '@sequelize/core';
import sequelize from '../Config/db'
import TaskModel from './Task';

function TagModel(sequelize:Sequelize){
   
    const Tag = sequelize.define('Tag', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Ensure that each tag is unique
        },
      }, {
        timestamps: false,
        tableName: 'Tags',
      });
   
    //   Tag.belongsToMany(Task, {
    //     through: TaskTag,
    //     foreignKey: 'tagId',    // Specify the foreign key for Tag in the TaskTag join table
    //     otherKey: 'taskId',     // Specify the foreign key for Task in the TaskTag join table
    //     as: 'tasks',            // Alias for tasks associated with a tag
    //   });
      
  return Tag; 
}
export default TagModel