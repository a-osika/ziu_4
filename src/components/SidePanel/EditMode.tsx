import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';

import { Typography, TextField, Button, Stack } from '@mui/material';

export function EditMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  const [title, setTitle] = useState(selectedTodo!.title);

  const handleSave = () => {
    if (!title.trim()) return;

    dispatch({
      type: 'EDIT',
      payload: { id: selectedTodo!.id, title },
    });

    dispatch({ type: 'SET_MODE', payload: 'view' });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <Typography variant='h6' sx={{ mb: 2 }}>
        Edycja
      </Typography>

      <Stack spacing={2} role='region' aria-label='Edycja zadania'>
        <TextField
          label='Tytuł'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Wpisz tekst...'
          fullWidth
        />

        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between' }}>
          <Button
            variant='outlined'
            onClick={() => dispatch({ type: 'SET_MODE', payload: 'view' })}
          >
            Anuluj
          </Button>

          <Button type='submit' variant='contained' disabled={!title.trim()}>
            Zapisz
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
