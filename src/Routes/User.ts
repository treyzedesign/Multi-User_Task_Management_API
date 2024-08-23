import {Router} from "express"
import { AssignRole, Login, Register } from "../Controllers/User";
import { AuthToken, isAdmin } from "../Middleware/Auth";

const userRoute = Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input.
 *       409: 
 *          description: email already exists
 *       500:
 *         description: Server Error - Internal server error.
 */
userRoute.post("/register", Register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Not Found - Invalid credentials.
 *       500:
 *         description: Server Error - Internal server error.
 */
userRoute.post('/login', Login);

/**
 * @swagger
 * /api/assignRole/{id}:
 *   patch:
 *     summary: Assign a role to a user.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role assigned successfully.
 *       400:
 *         description: Invalid user ID or role.
 *       401:
 *         description: Unauthorized access.
 *       403:
 *         description: Forbidden - Only admins can assign roles.
 */
userRoute.patch('/assignRole/:id', AuthToken, isAdmin, AssignRole);

export default userRoute