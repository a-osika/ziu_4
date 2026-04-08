import { Box, Toolbar } from '@mui/material';

import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import RecentTodosTimeline from './RecentTodosTimeline';

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <AppHeader />
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
