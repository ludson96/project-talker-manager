import 'express-async-errors';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { swaggerDocument } from './docs/swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger Interativa
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de verificação de integridade / Healthcheck
app.get('/health', (_req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Endpoint legado original mantido
app.get('/', (_req: Request, res: Response) => {
  return res.status(200).send();
});

// Roteamento
app.use(router);

// Middleware Global de Tratamento de Erros
app.use(errorMiddleware);

export { app };
