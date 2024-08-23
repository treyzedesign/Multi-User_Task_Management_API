import db from '../Config/db';
import { io } from '../WebSocket';


const notifyUser = (userId?: number, message?: string) => {
    if (userId && message) {
        io.to(userId.toString()).emit('notification', { message });
    } else {
        console.error('UserId or message is undefined');
    }
};
export const createNotification = async (userId: number, taskId: number, message: string) => {
    await db.Notification.create({
        userId,
        taskId,
        message,
    });
    notifyUser(userId, message);
};