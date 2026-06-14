import { useTodoContext } from '../../context/TodoContext';
import { Typography, TextField, Button, Stack, Chip, Box } from '@mui/material';

const priorityConfig = {
  low: { label: 'Niski priorytet', color: 'info' as const },
  medium: { label: 'Średni priorytet', color: 'warning' as const },
  high: { label: 'Wysoki priorytet', color: 'error' as const },
};

export function ViewMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  if (!selectedTodo) return null;

  const currentPriority = priorityConfig[selectedTodo.priority] || priorityConfig.medium;

  return (
    <article>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Szczegóły
      </Typography>

      <Stack spacing={2} role='region' aria-label='Szczegóły zadania'>
        <TextField
          label='Tytuł'
          value={selectedTodo.title}
          fullWidth
          slotProps={{ input: { readOnly: true } }}
        />

        {selectedTodo.description && (
          <TextField
            label='Opis'
            value={selectedTodo.description}
            multiline
            rows={3}
            fullWidth
            slotProps={{ input: { readOnly: true } }}
          />
        )}

        <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {selectedTodo.completed && <Chip label={'Ukończone'} color={'success'} size='small' />}

          <Chip
            label={currentPriority.label}
            color={currentPriority.color}
            size='small'
            variant='outlined'
          />
        </Stack>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Dodano: {new Date(selectedTodo.createdAt).toLocaleDateString()}
          </Typography>

          {selectedTodo.dueDate && (
            <Typography
              variant='body2'
              color={selectedTodo.completed ? 'text.secondary' : 'primary.main'}
              sx={{ fontWeight: 'bold' }}
            >
              Termin realizacji: {new Date(selectedTodo.dueDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>

        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', mt: 1 }}>
          <Button variant='outlined' onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}>
            Zamknij
          </Button>

          <Button
            variant='contained'
            onClick={() => dispatch({ type: 'SET_MODE', payload: 'edit' })}
          >
            Edytuj
          </Button>
        </Stack>
      </Stack>
    </article>
  );
}
