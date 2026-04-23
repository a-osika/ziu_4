import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../context/ThemeModeContext';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton onClick={toggleMode} color='inherit' aria-label='Przełącz motyw'>
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
