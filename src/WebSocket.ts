import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

const httpServer = new HttpServer();
export const io = new IOServer(httpServer);

io.on('connection', (socket) => {
    console.log('New client connected');

    // Example: Emit a notification event
    socket.emit('notification', {
        message: 'You have a new notification!',
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

export default httpServer