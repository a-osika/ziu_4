import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useTodoContext } from '../../context/TodoContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { todoSchema, TodoFormValues } from '../../schemas/todo.schema';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  CircularProgress,
} from '@mui/material';

export function EditMode() {
  const { selectedTodo, updateTodo, dispatch } = useTodoContext();
  const { showToast } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: selectedTodo!.title,
      description: selectedTodo!.description ?? '',
      priority: selectedTodo!.priority,
      dueDate: selectedTodo!.dueDate ? dayjs(selectedTodo!.dueDate) : null,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: TodoFormValues) => {
    try {
      await updateTodo(selectedTodo!.id, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate ? data.dueDate.toDate() : null,
      });
      showToast('Zadanie zostało zaktualizowane');
      dispatch({ type: 'SET_MODE', payload: 'view' });
    } catch {}
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Edycja zadania
      </Typography>

      <Stack spacing={2}>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Tytuł'
              required
              placeholder='Wpisz tekst...'
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Opis'
              multiline
              rows={3}
              placeholder='Dodaj szczegóły zadania...'
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name='priority'
          control={control}
          render={({ field }) => (
            <TextField {...field} select label='Priorytet' fullWidth>
              <MenuItem value='low'>Niski</MenuItem>
              <MenuItem value='medium'>Średni</MenuItem>
              <MenuItem value='high'>Wysoki</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name='dueDate'
          control={control}
          render={({ field }) => (
            <DatePicker
              label='Data realizacji'
              value={field.value}
              onChange={field.onChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dueDate,
                  helperText: errors.dueDate?.message,
                },
              }}
            />
          )}
        />

        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant='outlined'
            onClick={() => dispatch({ type: 'SET_MODE', payload: 'view' })}
          >
            Anuluj
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={18} color='inherit' /> : undefined}
          >
            Zapisz
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
