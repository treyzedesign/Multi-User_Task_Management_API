import {Router} from "express"
import { AuthToken, isAdmin } from "../Middleware/Auth";
import { assignTag, createTag } from "../Controllers/Tag";

const tagRoute = Router();

/**
 * @swagger
 * /api/createTag:
 *   post:
 *     summary: Create a new tag.
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Urgent"
 *     responses:
 *       201:
 *         description: Tag created successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Server error.
 */
tagRoute.post("/createTag", AuthToken, isAdmin, createTag)

/**
 * @swagger
 * /api/tag/assignTag:
 *   patch:
 *     summary: Assign a tag to a task.
 *     tags: [Tags]
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
 *               tagId:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Tag assigned to task successfully.
 *       400:
 *         description: Invalid input.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Server error.
 */
tagRoute.patch("/tag/assignTag", AuthToken, assignTag)

export default tagRoute