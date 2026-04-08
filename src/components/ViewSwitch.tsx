import { Button, Stack } from '@mui/material';
import { useViewMode } from '../context/ViewModeContext';

export function ViewSwitch() {
  const { mode, setMode } = useViewMode();

  return (
    <Stack direction="row" spacing={1}>
      <Button variant={mode === 'mui' ? 'contained' : 'outlined'} onClick={() => setMode('mui')}>
        MUI
      </Button>

      <Button
        variant={mode === 'tailwind' ? 'contained' : 'outlined'}
        onClick={() => setMode('tailwind')}
      >
        Tailwind
      </Button>
    </Stack>
  );
}
