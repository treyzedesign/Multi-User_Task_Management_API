// Import the 'express' module
import express from 'express';
import cors from 'cors'
import dotenv from "dotenv"
import userRoute from './Routes/User';
import taskRoute from './Routes/Task';
import tagRoute from './Routes/Tag';
import commentRoute from './Routes/Comment';
import httpServer from './WebSocket';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { url } from 'inspector';

dotenv.config()
const app = express();

const port = process.env.PORT || 2240;
const socketPort = process.env.SOCKETPORT || 4244
app.use(express.json())
app.use(cors())
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for the Multi-Task Management System.',
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT', 
          },
      },
    }
  },
  apis: ['./src/routes/*.ts'], 
  
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoute)
app.use('/api', taskRoute)
app.use('/api', tagRoute)
app.use('/api', commentRoute)

httpServer.listen(socketPort,()=>{
  console.log(`WebSocket server listening on port ${socketPort}`);
})
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});

