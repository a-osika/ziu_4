import { createTheme } from '@mui/material/styles';
import { lightTokens, darkTokens } from './tokens';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const t = mode === 'light' ? lightTokens : darkTokens;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: t.primary.main,
        contrastText: t.text.onPrimary,
      },

      secondary: {
        main: t.secondary.main,
      },

      background: {
        default: t.surface.background,
        paper: t.surface.card,
      },

      text: {
        primary: t.text.primary,
        secondary: t.text.secondary,
        disabled: t.text.disabled,
      },

      error: {
        main: t.semantic.error,
      },

      success: {
        main: t.semantic.success,
      },
    },

    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

      h1: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.03em',
      },

      h2: {
        fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },

      h3: {
        fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },

      h4: {
        fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },

      h5: {
        fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
        fontWeight: 600,
        letterSpacing: '-0.015em',
      },

      h6: {
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },

      body1: {
        fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
        lineHeight: 1.6,
      },

      body2: {
        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
        lineHeight: 1.5,
      },

      button: {
        fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
        textTransform: 'none',
        fontWeight: 600,
      },

      caption: {
        fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
      },

      overline: {
        fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
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
      MuiPaper: {
        styleOverrides: {
          elevation1: {
            boxShadow:
              mode === 'dark' ? '0 2px 12px rgba(0,0,0,0.5)' : '0 2px 12px rgba(0,0,0,0.08)',
            borderRadius: 12,
          },
        },
      },
    },
  });
};
