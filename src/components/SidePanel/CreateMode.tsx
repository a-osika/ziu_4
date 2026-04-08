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
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Nowe zadanie
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Input
          label="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Np. Zakupy"
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={!title.trim()}
        >
          Dodaj
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => dispatch({ type: 'CLEAR_SELECTION' })}>
          Anuluj
        </Button>
      </Box>
    </Box>
  );
}
