import { Router } from 'express';
import { authRoutes } from './authRoutes';
import { talkerRoutes } from './talkerRoutes';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middlewares/validateRequest';
import { loginSchema } from '../schemas/authSchema';

const router = Router();
const authController = new AuthController();

// Rotas profissionais organizadas em namespace
router.use('/auth', authRoutes);
router.use('/talkers', talkerRoutes);

// Aliases para 100% de compatibilidade reversa com o formato original /talker e /login
router.use('/talker', talkerRoutes);
router.post('/login', validateBody(loginSchema), authController.login);

export { router };
