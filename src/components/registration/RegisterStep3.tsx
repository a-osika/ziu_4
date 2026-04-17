import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';

type Props = {
  form: UseFormReturn<any>;
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
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Podsumowanie</Typography>

      <Box>
        <Typography>Imię: {values.firstName}</Typography>
        <Typography>Nazwisko: {values.lastName}</Typography>
        <Typography>Email: {values.email}</Typography>
        <Typography>
          Kategorie: {values.categories?.join(', ')}
        </Typography>
        <Typography>
          Powiadomienia: {values.notifications?.email ? 'Email ' : ''}
          {values.notifications?.push ? 'Push' : ''}
        </Typography>
      </Box>

      {/* RODO */}
      <Controller
        name="rodo"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Akceptuję RODO"
          />
        )}
      />

      {errors.rodo && (
        <Typography color="error" variant="caption">
          {errors.rodo.message as string}
        </Typography>
      )}

      {errors.root?.serverError && (
        <Typography color="error">
          {errors.root.serverError.message}
        </Typography>
      )}

      <Button variant="contained" onClick={onSubmit}>
        Zarejestruj się
      </Button>
    </Box>
  );
}