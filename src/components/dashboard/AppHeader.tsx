import { AppBar, Toolbar, IconButton, Box, Switch, FormControlLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import { useState } from 'react';

import { ThemeToggle } from '../../components/ThemeToggle';
import { MockControls } from '../dev/MockControls';

export default function AppHeader({
  onMenuClick,
  isMobile,
}: {
  onMenuClick: () => void;
  isMobile: boolean;
}) {
  const [devOpen, setDevOpen] = useState(() => localStorage.getItem('dev:panelOpen') === 'true');

  const toggleDev = (checked: boolean) => {
    setDevOpen(checked);
    localStorage.setItem('dev:panelOpen', String(checked));
  };

  return (
    <>
      <AppBar position='fixed' color='inherit' component='header'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={onMenuClick} aria-label='Pokaż menu' aria-expanded='false'>
                <MenuIcon aria-hidden='true' />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {import.meta.env.DEV && (
              <FormControlLabel
                sx={{ mr: 1 }}
                control={
                  <Switch
                    size='small'
                    checked={devOpen}
                    onChange={(e) => toggleDev(e.target.checked)}
                  />
                }
                label='DEV'
              />
            )}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {import.meta.env.DEV && devOpen && <MockControls />}
    </>
  );
}
