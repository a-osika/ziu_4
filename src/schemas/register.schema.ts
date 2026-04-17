import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: z.string().email('Podaj poprawny adres e-mail'),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Musi zawierać dużą literę')
    .regex(/[0-9]/, 'Musi zawierać cyfrę'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła muszą się zgadzać',
  path: ['confirmPassword'],
});

export const step2Schema = z.object({
  categories: z.array(z.string()).min(1, 'Wybierz co najmniej 1 kategorię'),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }),
  newsletter: z.boolean().optional(),
});

export const step3Schema = z.object({
  rodo: z.literal(true, {
    errorMap: () => ({ message: 'Musisz zaakceptować RODO' }),
  }),
});

export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);