import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import { TodoProvider } from './context/TodoContext';
import { SnackbarProvider } from './context/SnackbarContext';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AuthLayout from './components/auth/AuthLayout';
import Sidebar from './components/dashboard/Sidebar';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TodosPage = lazy(() => import('./pages/TodosPage'));

const DRAWER_WIDTH = 240;

function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
        width: '100%',
      }}
    >
      <CircularProgress aria-label='Ładowanie' />
    </Box>
  );
}

function AppShell() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopOpen = !isMobile;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar variant='persistent' open={desktopOpen} onClose={() => {}} />

      {isMobile && (
        <Sidebar variant='temporary' open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          ml: desktopOpen ? 0 : `-${DRAWER_WIDTH}px`,
          transition: theme.transitions.create('margin', {
            easing: desktopOpen ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
            duration: desktopOpen
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Routes>
          <Route
            path='/'
            element={
              <DashboardLayout onMenuClick={() => setMobileOpen(true)} isMobile={isMobile}>
                <Suspense fallback={<Loader />}>
                  <DashboardPage />
                </Suspense>
              </DashboardLayout>
            }
          />
          <Route
            path='/todos'
            element={
              <DashboardLayout onMenuClick={() => setMobileOpen(true)} isMobile={isMobile}>
                <Suspense fallback={<Loader />}>
                  <TodosPage />
                </Suspense>
              </DashboardLayout>
            }
          />
          <Route
            path='/register'
            element={
              <AuthLayout onMenuClick={() => setMobileOpen(true)} isMobile={isMobile}>
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              </AuthLayout>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <SnackbarProvider>
      <TodoProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </TodoProvider>
    </SnackbarProvider>
  );
}
