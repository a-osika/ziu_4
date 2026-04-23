import { useTodoContext } from '../../context/TodoContext';

import { Fab as MuiFab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function Fab() {
  const { dispatch } = useTodoContext();

  return (
    <MuiFab
      color='primary'
      onClick={() => dispatch({ type: 'OPEN_CREATE' })}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        boxShadow: 6,
      }}
      aria-label='Dodaj zadanie'
    >
      <AddIcon />
    </MuiFab>
  );
}
