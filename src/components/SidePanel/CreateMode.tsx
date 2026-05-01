import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Input } from '../Input/Input';

import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function CreateMode() {
  const { dispatch, setFilter, setQuery } = useTodoContext();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch({ type: 'ADD', payload: title });

    setFilter('all');
    setQuery('');

    dispatch({ type: 'CLEAR_SELECTION' });
    setTitle('');
  };

  return (
    <article>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Nowe zadanie
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Input
            label='Tytuł'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Np. Zakupy'
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant='outlined' onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}>
            Anuluj
          </Button>

          <Button
            type='submit'
            variant='contained'
            startIcon={<AddIcon aria-hidden='true' />}
            disabled={!title.trim()}
          >
            Dodaj
          </Button>
        </Box>
      </form>
    </article>
  );
}
