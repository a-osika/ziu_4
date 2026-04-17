import { TextField, Box, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any>;
};

const getStrength = (password: string) => {
  if (!password) return '';
  if (password.length < 6) return 'słabe';
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 'silne';
  return 'średnie';
};

export default function RegisterStep1({ form }: Props) {
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const password = watch('password');
  const strength = getStrength(password);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Dane użytkownika</Typography>

      <TextField
        label="Imię"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        fullWidth
      />

      <TextField
        label="Nazwisko"
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        fullWidth
      />

      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Hasło"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      {password && (
        <Typography variant="caption">
          Siła hasła: <b>{strength}</b>
        </Typography>
      )}

      <TextField
        label="Potwierdź hasło"
        type="password"
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
      />
    </Box>
  );
}