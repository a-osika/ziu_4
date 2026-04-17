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

type Props = {
  form: UseFormReturn<any>;
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
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Preferencje</Typography>

      <Typography variant="subtitle2">Kategorie</Typography>

      {fields.map((field, index) => (
        <Box key={field.id} display="flex" gap={1}>
          <TextField
            {...register(`categories.${index}`)}
            fullWidth
            error={!!errors.categories}
          />

          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button variant="outlined" onClick={() => append('')}>
        Dodaj kategorię
      </Button>

      <Typography variant="subtitle2">Powiadomienia</Typography>

      <Controller
        name="notifications.email"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                aria-label="Email notifications"
              />
            }
            label="Email"
          />
        )}
      />

      <Controller
        name="notifications.push"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Push"
          />
        )}
      />


      <Controller
        name="newsletter"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Newsletter (opcjonalnie)"
          />
        )}
      />

      {errors.categories && (
        <Typography color="error" variant="caption">
          {errors.categories.message as string}
        </Typography>
      )}
    </Box>
  );
}