import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { ViewModeProvider, useViewMode } from './context/ViewModeContext';

import TodoInputTailwind from './components/Input/InputTailwind';
import TodoListTailwind from './components/TodoList/TodoListTailwind';

import DashboardLayout from './components/dashboard/DashboardLayout';
import StatsGrid from './components/dashboard/StatsGrid';

import { SearchBar } from './components/SearchBar/SearchBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { TodoList } from './components/TodoList/TodoList';
import { SidePanel } from './components/SidePanel/SidePanel';
import { Fab } from './components/Fab/Fab';
import { Box } from '@mui/material';
import RecentTodosTimeline from './components/dashboard/RecentTodosTimeline';

function TodosPage() {
  const { mode } = useViewMode();

  if (mode === 'tailwind') {
    return (
      <>
        <TodoInputTailwind />
        <FilterBar />
        <TodoListTailwind />
      </>
    );
  }

  // MUI
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
    <ThemeProvider>
      <TodoProvider>
        <ViewModeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardLayout>
                    <DashboardPage />
                  </DashboardLayout>
                }
              />

              <Route
                path="/todos"
                element={
                  <DashboardLayout>
                    <TodosPage />
                  </DashboardLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </ViewModeProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}
