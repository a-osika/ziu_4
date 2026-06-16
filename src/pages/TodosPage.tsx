import { Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { FilterBar } from '../components/FilterBar/FilterBar';
import { TodoList } from '../components/TodoList/TodoList';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Fab } from '../components/Fab/Fab';

export default function TodosPage() {
  return (
    <>
      <Typography component='h1' sx={visuallyHidden}>
        Moje zadania
      </Typography>

      <Box component='section' aria-label='Wyszukiwanie i filtrowanie zadań'>
        <SearchBar />
        <FilterBar />
      </Box>

      <Fab />

      <Box aria-label='Lista zadań'>
        <TodoList />
      </Box>

      <SidePanel />
    </>
  );
}
