import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'O "name" deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'O "email" deve ter o formato "email@email.com"' }),
  password: z.string().min(6, { message: 'O "password" deve ter pelo menos 6 caracteres' }),
});

export const loginSchema = z.object({
  email: z.string({ error: 'O campo "email" é obrigatório' }).email({ message: 'O "email" deve ter o formato "email@email.com"' }),
  password: z.string({ error: 'O campo "password" é obrigatório' }).min(6, { message: 'O "password" deve ter pelo menos 6 caracteres' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
