import {Router} from "express"
import { AuthToken, isAdmin } from "../Middleware/Auth";
import { createNewComment, deleteComment, editComment } from "../Controllers/Comment";


const commentRoute = Router();
/**
 * @swagger
 * /api/comment:
 *   post:
 *     summary: Create a new comment on a task.
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *                 example: "This task needs to be prioritized."
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Server error.
 */
commentRoute.post("/comment", AuthToken, createNewComment)
/**
 * @swagger
 * /api/comment/{id}:
 *   patch:
 *     summary: Edit a comment.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the comment to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Updated comment content."
 *     responses:
 *       200:
 *         description: Comment edited successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Server error.
 */
commentRoute.patch('/comment/:id', AuthToken, editComment) 

/**
 * @swagger
 * /api/comment/{id}:
 *   delete:
 *     summary: Delete a comment.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: Comment not found.
 *       500:
 *         description: Server error.
 */
commentRoute.delete('/comment/:id', AuthToken, deleteComment)
export default commentRoute