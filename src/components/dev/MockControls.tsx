import { useState } from 'react';
import { Box, FormControlLabel, Switch, Button, Typography, Stack } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';

const OPS = [
  { key: 'get', label: 'GET — pobieranie listy' },
  { key: 'post', label: 'POST — dodawanie' },
  { key: 'put', label: 'PUT — edycja / status' },
  { key: 'delete', label: 'DELETE — usuwanie' },
] as const;

export function MockControls() {
  const { fetchTodos } = useTodoContext();
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      OPS.map((o) => [o.key, localStorage.getItem(`mock:fail:${o.key}`) === 'true'])
    )
  );

  const toggle = (key: string, checked: boolean) => {
    setFlags((prev) => ({ ...prev, [key]: checked }));
    localStorage.setItem(`mock:fail:${key}`, String(checked));
  };

  return (
    <Box
      aria-hidden='true'
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        p: 2,
        width: 260,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
        zIndex: 1300,
      }}
    >
      <Typography variant='caption' sx={{ display: 'block', mb: 1, fontWeight: 700 }}>
        DEV · symulacja błędów API
      </Typography>

      <Stack>
        {OPS.map((o) => (
          <FormControlLabel
            key={o.key}
            label={o.label}
            control={
              <Switch
                size='small'
                checked={flags[o.key]}
                onChange={(e) => toggle(o.key, e.target.checked)}
                slotProps={{ input: { tabIndex: -1 } }}
              />
            }
          />
        ))}
      </Stack>

      <Button
        size='small'
        variant='outlined'
        fullWidth
        sx={{ mt: 1 }}
        tabIndex={-1}
        onClick={() => fetchTodos()}
      >
        Przeładuj listę
      </Button>
    </Box>
  );
}
