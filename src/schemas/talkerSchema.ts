import { z } from 'zod';

const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

export const talkSchema = z.object({
  watchedAt: z.string({ error: 'O campo "watchedAt" é obrigatório' })
    .regex(dateRegex, { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }),
  rate: z.number({ error: 'O campo "rate" é obrigatório' })
    .int({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' })
    .min(1, { message: 'O campo "rate" deve ser um inteiro de 1 à 5' })
    .max(5, { message: 'O campo "rate" deve ser um inteiro de 1 à 5' }),
});

export const createTalkerSchema = z.object({
  name: z.string({ error: 'O campo "name" é obrigatório' })
    .min(3, { message: 'O "name" deve ter pelo menos 3 caracteres' }),
  age: z.number({ error: 'O campo "age" é obrigatório' })
    .int()
    .min(18, { message: 'A pessoa palestrante deve ser maior de idade' }),
  talk: talkSchema,
});

export const updateTalkerSchema = createTalkerSchema;

export const searchQuerySchema = z.object({
  q: z.string().optional(),
  rate: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type CreateTalkerInput = z.infer<typeof createTalkerSchema>;
export type UpdateTalkerInput = z.infer<typeof updateTalkerSchema>;
