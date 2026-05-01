import { Box, Typography, Checkbox, FormControlLabel, Button } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import { RegistrationForm } from '../../schemas/register.schema';

type Props = {
  form: UseFormReturn<RegistrationForm>;
  onSubmit: () => void;
};

export default function RegisterStep3({ form, onSubmit }: Props) {
  const {
    control,
    getValues,
    formState: { errors },
  } = form;

  const values = getValues();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      component='section'
      aria-label='Podsumowanie danych'
    >
      <Box component='dl'>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Imię:
        </Typography>
        <Typography component='dd'>{values.firstName}</Typography>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Nazwisko:
        </Typography>
        <Typography component='dd'>{values.lastName}</Typography>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Email:
        </Typography>
        <Typography component='dd'>{values.email}</Typography>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Kategorie:
        </Typography>
        <Typography component='dd'>
          {values.categories?.map((cat) => cat.value).join(', ')}
        </Typography>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Powiadomienia:
        </Typography>
        <Typography component='dd'>
          {values.notifications?.email ? 'Email ' : ''}
          {values.notifications?.push ? 'Push' : ''}
        </Typography>
        <Typography component='dt' sx={{ fontWeight: 'bold' }}>
          Newsletter:
        </Typography>
        <Typography component='dd'>{values.newsletter ? 'Tak' : 'Nie'}</Typography>
      </Box>

      <Controller
        name='rodo'
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                aria-label='Zgoda na przetwarzanie danych osobowych'
              />
            }
            label='Akceptuję RODO'
          />
        )}
      />

      {errors.rodo && (
        <Typography color='error' variant='caption'>
          {errors.rodo.message as string}
        </Typography>
      )}

      {errors.root?.serverError && (
        <Typography color='error'>{errors.root.serverError.message}</Typography>
      )}

      <Button variant='contained' onClick={onSubmit}>
        Zarejestruj się
      </Button>
    </Box>
  );
}
