import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { TodoProvider } from './context/TodoContext';

import DashboardLayout from './components/dashboard/DashboardLayout';
import AuthLayout from './components/auth/AuthLayout';

import DashboardPage from './pages/DashboardPage';

const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TodosPage = lazy(() => import('./pages/TodosPage'));

function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />

          <Route
            path='/todos'
            element={
              <DashboardLayout>
                <Suspense fallback={<Loader />}>
                  <TodosPage />
                </Suspense>
              </DashboardLayout>
            }
          />

          <Route
            path='/register'
            element={
              <AuthLayout>
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}
