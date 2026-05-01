import { useTodoContext } from '../../context/TodoContext';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export function SearchBar() {
  const { query, setQuery } = useTodoContext();

  return (
    <TextField
      fullWidth
      placeholder='Szukaj zadania...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      variant='outlined'
      sx={{ mb: 2 }}
      label='Wyszukaj zadania'
      aria-label='Wyszukaj zadania'
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon aria-hidden='true' />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setQuery('')}
                aria-label='Wyczyść wyszukiwanie'
                title='Wyczyść wyszukiwanie'
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
}
