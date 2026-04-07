import { useTodoContext } from '../../context/TodoContext';

import { Box, Typography, TextField, Button, Stack, Chip } from '@mui/material';

export function ViewMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  if (!selectedTodo) return null;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Szczegóły
      </Typography>

      <Stack spacing={2}>
        <TextField label="Tytuł" value={selectedTodo.title} fullWidth disabled />

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Chip
            label={selectedTodo.completed ? 'Ukończone' : 'Oczekujące'}
            color={selectedTodo.completed ? 'success' : 'default'}
            size="small"
          />

          <Typography variant="body2" color="text.secondary">
            Dodano: {selectedTodo.createdAt.toLocaleDateString()}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}>
            Zamknij
          </Button>

          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'SET_MODE', payload: 'edit' })}
          >
            Edytuj
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
