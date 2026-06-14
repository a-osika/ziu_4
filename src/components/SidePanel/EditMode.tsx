import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Input } from '../Input/Input';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { Typography, TextField, Button, Stack, MenuItem, Box } from '@mui/material';

type Priority = 'low' | 'medium' | 'high';

export function EditMode() {
  const { selectedTodo, dispatch } = useTodoContext();

  const [title, setTitle] = useState(selectedTodo!.title);
  const [description, setDescription] = useState(selectedTodo!.description || '');
  const [priority, setPriority] = useState<Priority>(
    (selectedTodo!.priority as Priority) || 'medium'
  );

  const [dueDate, setDueDate] = useState<Dayjs | null>(
    selectedTodo!.dueDate ? dayjs(selectedTodo!.dueDate) : null
  );

  const handleSave = () => {
    if (!title.trim()) return;

    dispatch({
      type: 'EDIT',
      payload: {
        id: selectedTodo!.id,
        title,
        description,
        priority,
        dueDate: dueDate ? dueDate.toDate() : null,
      },
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
        <Input
          label='Tytuł'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Wpisz tekst...'
        />

        <TextField
          label='Opis'
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Dodaj szczegóły zadania...'
          fullWidth
        />

        <TextField
          select
          label='Priorytet'
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          fullWidth
        >
          <MenuItem value='low'>Niski</MenuItem>
          <MenuItem value='medium'>Średni</MenuItem>
          <MenuItem value='high'>Wysoki</MenuItem>
        </TextField>

        <DatePicker
          label='Data realizacji'
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <Stack direction='row' spacing={1} sx={{ justifyContent: 'space-between', mt: 1 }}>
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
