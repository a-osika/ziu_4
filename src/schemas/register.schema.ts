import { z } from 'zod';

export const step1BaseSchema = z.object({
  firstName: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: z.email({ message: 'Podaj poprawny adres e-mail' }),
  password: z
    .string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Musi zawierać dużą literę')
    .regex(/[0-9]/, 'Musi zawierać cyfrę'),
  confirmPassword: z.string(),
});

const passwordRefine = (data: { password: string; confirmPassword: string }) =>
  data.password === data.confirmPassword;

const passwordRefineOpts = { message: 'Hasła muszą się zgadzać', path: ['confirmPassword'] };

export const step2Schema = z.object({
  categories: z
    .array(
      z.object({
        value: z.string().nonempty({ message: 'Kategoria nie może być pusta' }),
      })
    )
    .min(1, 'Wybierz co najmniej 1 kategorię'),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }),
  newsletter: z.boolean(),
});

export const step3Schema = z.object({
  rodo: z.boolean().refine((val) => val === true, {
    message: 'Musisz zaakceptować RODO',
  }),
});

export const step1Schema = step1BaseSchema.refine(passwordRefine, passwordRefineOpts);

export const fullSchema = step1BaseSchema
  .merge(step2Schema)
  .merge(step3Schema)
  .refine(passwordRefine, passwordRefineOpts);

export type RegistrationForm = z.infer<typeof fullSchema>;

export type FormState = {
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: Step3Data;
};

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
