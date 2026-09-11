import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    const firstIssue = err.issues[0];
    return res.status(400).json({
      message: firstIssue ? firstIssue.message : 'Dados inválidos',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  console.error('Unhandled server error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
