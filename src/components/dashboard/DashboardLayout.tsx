import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <AppHeader onMenuClick={() => setOpen(true)} isMobile={isMobile} />
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
