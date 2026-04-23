import { fullSchema, RegistrationForm } from '../schemas/register.schema';

export type ApiError = {
  status: number;
  field?: keyof RegistrationForm | 'root';
  message: string;
};

export const fakeRegister = async (data: RegistrationForm) => {
  const parsed = fullSchema.safeParse(data);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    throw {
      status: 400,
      field: issue.path[0] as keyof RegistrationForm | 'root',
      message: issue.message,
    } satisfies ApiError;
  }

  // fake business error
  if (data.email === 'taken@test.com') {
    throw {
      status: 409,
      field: 'email',
      message: 'Email zajęty',
    } satisfies ApiError;
  }

  // random server error
  if (Math.random() < 0.1) {
    throw {
      status: 500,
      field: 'root',
      message: 'Błąd serwera',
    } satisfies ApiError;
  }

  return { ok: true };
};
