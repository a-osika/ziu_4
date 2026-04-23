import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TodoProvider } from './context/TodoContext';

import DashboardLayout from './components/dashboard/DashboardLayout';
import StatsGrid from './components/dashboard/StatsGrid';

import AuthLayout from './components/auth/AuthLayout';
import RegisterPage from './pages/RegisterPage';

import { SearchBar } from './components/SearchBar/SearchBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import { SidePanel } from './components/SidePanel/SidePanel';
import { Fab } from './components/Fab/Fab';
import { Box } from '@mui/material';
import RecentTodosTimeline from './components/dashboard/RecentTodosTimeline';

function TodosPage() {
  return (
    <>
      <SearchBar />
      <FilterBar />
      <TodoList />
      <SidePanel />
      <Fab />
    </>
  );
}

function DashboardPage() {
  return (
    <>
      <StatsGrid />
      <Box sx={{ mt: 4 }}>
        <RecentTodosTimeline />
      </Box>
    </>
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
                <TodosPage />
              </DashboardLayout>
            }
          />

          <Route
            path='/register'
            element={
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}
