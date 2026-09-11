import { Router } from 'express';
import { TalkerController } from '../controllers/TalkerController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateBody, validateQuery } from '../middlewares/validateRequest';
import { createTalkerSchema, searchQuerySchema, updateTalkerSchema } from '../schemas/talkerSchema';

const talkerRoutes = Router();
const talkerController = new TalkerController();

// Métricas e estatísticas
talkerRoutes.get('/metrics', talkerController.getMetrics);

// Busca com query params
talkerRoutes.get('/search', authMiddleware, validateQuery(searchQuerySchema), talkerController.search);

// CRUD de Palestrantes
talkerRoutes.get('/', talkerController.getAll);
talkerRoutes.get('/:id', talkerController.getById);

talkerRoutes.post('/', authMiddleware, validateBody(createTalkerSchema), talkerController.create);
talkerRoutes.put('/:id', authMiddleware, validateBody(updateTalkerSchema), talkerController.update);
talkerRoutes.delete('/:id', authMiddleware, talkerController.delete);

export { talkerRoutes };
