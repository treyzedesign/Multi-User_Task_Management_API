import {Router} from "express"
import { AuthToken, isAdmin } from "../Middleware/Auth";
import { assignTask, createNewTask, getAllTask, updateTaskStatus } from "../Controllers/Task";

const taskRoute = Router();

/**
 * @swagger
 * /api/createTask:
 *   post:
 *     summary: Create a new task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Fix login issue"
 *               description:
 *                 type: string
 *                 example: "Fix the bug preventing users from logging in."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-30"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: UnAuthorized.
 *       403:
 *         description: Forbidden .
 *       500:
 *         description: Server error.
 *      
 */
taskRoute.post("/createTask", AuthToken, createNewTask)
/**
 * @swagger
 * /api/task/assignTask:
 *   patch:
 *     summary: Assign a task to a user.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: number
 *                 example: 1
 *               userId:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Task assigned successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: UnAuthorized.
 *       500:
 *         description: Server error.
 */
taskRoute.patch("/task/assignTask", AuthToken, assignTask)
/**
 * @swagger
 * /api/task/updateStatus:
 *   patch:
 *     summary: Update the status of a task.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Task status updated successfully.
 *       400:
 *         description: Bad Request.
 *       401:
 *         description: UnAuthorized.
 *       500:
 *         description: Server error.
 */
taskRoute.patch("/task/updateStatus", AuthToken, updateTaskStatus)
/**a
 * @swagger
 * /api/task/getAllTasks:
 *   get:
 *     summary: Retrieve all tasks.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of tasks per page.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., dueDate).
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order.
 *       - in: query
 *         name: tagName
 *         schema:
 *           type: string
 *         description: filter by tag name (e.g., Urgent).
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: filter by status (e.g., Completed).
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully.
 *       404:
 *         description: No tasks found.
 *       500:
 *         description: Server error.
 */
taskRoute.get("/task/getAllTasks", AuthToken, getAllTask)

export default taskRoute