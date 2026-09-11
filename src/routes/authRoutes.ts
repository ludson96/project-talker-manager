import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middlewares/validateRequest';
import { loginSchema, registerSchema } from '../schemas/authSchema';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validateBody(registerSchema), authController.register);
authRoutes.post('/login', validateBody(loginSchema), authController.login);

export { authRoutes };
