import db from '../Config/db'
import { NewUser } from '../Interface';


export const createUser = async (UserData: NewUser) => {
    const newUser = await db.User.create(UserData);
    return newUser;
}
export const getAllUsers = async ()=>{
    return await db.User.findAll()
}
export const getUserByEmail = async (email:string)=>{
    const user = await db.User.findOne({where:{email : email}})
    return user
}
export const getUserById = async (id:number)=>{
    const user = await db.User.findByPk(id)
    return user
}
export const UpdateRole = async (role: string, id: number)=>{
    return await db.User.update({role:role}, {
        where: {
            id: id
        }
    })
} 