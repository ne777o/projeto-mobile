import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres') // Regra 1
    .max(50, 'Título muito longo (máx 50)'),           // Regra 2
  description: z
    .string()
    .max(200, 'Descrição muito longa (máx 200)')       // Regra 3
    .optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;