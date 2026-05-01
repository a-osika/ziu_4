import {
  Box,
  Typography,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { UseFormReturn, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import { RegistrationForm } from '../../schemas/register.schema';

type Props = {
  form: UseFormReturn<RegistrationForm>;
};

export default function RegisterStep2({ form }: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box component='fieldset'>
        <Typography component='legend' variant='subtitle2' sx={{ mb: 1 }}>
          Kategorie
        </Typography>

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
            <TextField
              {...register(`categories.${index}.value`)}
              fullWidth
              error={!!errors.categories?.[index]?.value}
              helperText={errors.categories?.[index]?.value?.message?.toString()}
              label={`Kategoria ${index + 1}`}
            />

            <IconButton onClick={() => remove(index)} aria-label={`Usuń kategorię ${index + 1}`}>
              <DeleteIcon aria-hidden='true' />
            </IconButton>
          </Box>
        ))}

        <Button variant='outlined' onClick={() => append({ value: '' })}>
          Dodaj kategorię
        </Button>

        {errors.categories && (
          <Typography color='error' variant='caption' role='alert'>
            {errors.categories.message?.toString()}
          </Typography>
        )}
      </Box>

      <Box component='fieldset'>
        <Typography component='legend' variant='subtitle2' sx={{ mb: 1 }}>
          Powiadomienia
        </Typography>

        <Controller
          name='notifications.email'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} aria-label='Powiadomienia email' />
              }
              label='Email'
            />
          )}
        />

        <Controller
          name='notifications.push'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} aria-label='Powiadomienia push' />
              }
              label='Push'
            />
          )}
        />

        <Controller
          name='newsletter'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} aria-label='Subskrypcja newslettera' />
              }
              label='Newsletter (opcjonalnie)'
            />
          )}
        />
      </Box>
    </Box>
  );
}
