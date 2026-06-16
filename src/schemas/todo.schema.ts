import { z } from 'zod';
import type { Dayjs } from 'dayjs';

export const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Tytuł musi mieć co najmniej 3 znaki')
    .max(80, 'Maksymalnie 80 znaków'),
  description: z.string().max(500, 'Opis maksymalnie 500 znaków').optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.custom<Dayjs | null>().nullable(),
});

export type TodoFormValues = z.infer<typeof todoSchema>;
