import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../context/ThemeModeContext';

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      onClick={toggleMode}
      color='inherit'
      aria-label={`Przełącz na motyw ${mode === 'light' ? 'ciemny' : 'jasny'}`}
      aria-pressed={mode === 'dark'}
    >
      {mode === 'light' ? (
        <DarkModeIcon aria-hidden='true' />
      ) : (
        <LightModeIcon aria-hidden='true' />
      )}
    </IconButton>
  );
}
