import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} color="inherit">
      {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
