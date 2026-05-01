import { useTodoContext } from '../../context/TodoContext';

import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';

export function FilterBar() {
  const { filter, setFilter } = useTodoContext();

  return (
    <Box component='fieldset'>
      <Typography component='legend' variant='subtitle2' sx={{ mb: 1 }}>
        Filtruj zadania:
      </Typography>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, value) => value && setFilter(value)}
        sx={{ mb: 2 }}
        aria-label='Filtruj zadania po statusie'
      >
        <ToggleButton value='all' aria-pressed={filter === 'all'}>
          Wszystkie
        </ToggleButton>
        <ToggleButton value='active' aria-pressed={filter === 'active'}>
          Aktywne
        </ToggleButton>
        <ToggleButton value='completed' aria-pressed={filter === 'completed'}>
          Zakończone
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
