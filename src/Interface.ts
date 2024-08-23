export interface NewUser{
    name: string,
    email: string,
    password: string,
    role: string
}

export interface NewTask{
    title: string,
    description: string,
    dueDate: Date,
    createdBy: Number
}
export interface NewTag{
    name:string
}
export interface dbModel{
    User : any,
    Task : any,
    Tag: any,
    TaskTag : any,
    Comment: any,
    Notification: any
  }

export interface NewComment{
    content : string,
    taskId: number,
    createdBy: number
}