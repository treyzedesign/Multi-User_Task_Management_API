import Sequelize, { DataTypes } from '@sequelize/core';


const UserModel = (sequelize:Sequelize)=>{
    const Attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.ENUM('Admin', 'User'),
            allowNull: false,
            defaultValue: 'User',
          },
        }
    const options = {
        freezeTableName: true,
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
    };
    return sequelize.define("Users", Attributes, options);
}
export default UserModel
