import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: '#1565C0',
        light: '#1E88E5',
        dark: '#0D47A1',
        contrastText: '#FFFFFF',
      },

      secondary: {
        main: '#E65100',
        light: '#FF8A65',
        dark: '#BF360C',
      },

      success: { main: '#2E7D32' },
      error: { main: '#B71C1C' },

      background: {
        default: mode === 'dark' ? '#121212' : '#F5F7FA',
        paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
      },
    },

    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' },
      h2: { fontSize: 'clamp(1.25rem, 3vw, 2rem)' },
      body1: { fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' },
      body2: { fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },

    shape: {
      borderRadius: 10,
    },

    spacing: 8,

    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, paddingLeft: 20, paddingRight: 20 },
        },
      },

      MuiTextField: {
        defaultProps: { variant: 'outlined', size: 'small' },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'dark' ? '0 2px 12px rgba(0,0,0,0.5)' : '0 2px 12px rgba(0,0,0,0.08)',
            borderRadius: 12,
          },
        },
      },
    },
  });
