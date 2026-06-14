import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Priority } from '../../types/todo.types'
import { Input } from '../Input/Input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

import { Button, Typography, MenuItem, TextField, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/AddOutlined';

export function CreateMode() {
  const { dispatch, setFilter, setQuery } = useTodoContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch({ 
      type: 'ADD', 
      payload: { 
        title, 
        description, 
        priority, 
        dueDate: dueDate ? dueDate.toDate() : null
      } 
    });

    setFilter('all');
    setQuery('');
    dispatch({ type: 'CLEAR_SELECTION' });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(null);
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
        <Stack spacing={2} role='region' aria-label='Nowe zadanie'>
          <Input
            label='Tytuł'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Wpisz tekst...'
          />

          <TextField
            label="Opis"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Dodaj szczegóły zadania..."
            fullWidth
          />

            <TextField
              select
              label="Priorytet"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              fullWidth
            >
              <MenuItem value="low">Niski</MenuItem>
              <MenuItem value="medium">Średni</MenuItem>
              <MenuItem value="high">Wysoki</MenuItem>
            </TextField>

          <DatePicker
              label="Data realizacji"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
        </Stack>

        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', mt: 2 }}>
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
        </Stack>
      </form>
    </article>
  );
}