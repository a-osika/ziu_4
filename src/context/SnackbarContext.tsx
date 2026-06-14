import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type SnackbarContextType = { showToast: (message: string, severity?: AlertColor) => void };
const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; severity: AlertColor } | null>(null);
  const [open, setOpen] = useState(false);

  const showToast = (message: string, severity: AlertColor = 'success') => {
    setToast({ message, severity });
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        aria-live={toast?.severity === 'error' ? 'assertive' : 'polite'}
      >
        <Alert severity={toast?.severity} onClose={() => setOpen(false)} variant='filled'>
          {toast?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used inside SnackbarProvider');
  return ctx;
}
