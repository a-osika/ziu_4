import { Box, Toolbar } from '@mui/material';
import AppHeader from './AppHeader';
import { PageTransition } from '../PageTransition';

export default function DashboardLayout({
  children,
  onMenuClick,
  isMobile,
}: {
  children?: React.ReactNode;
  onMenuClick: () => void;
  isMobile: boolean;
}) {
  return (
    <>
      <AppHeader onMenuClick={onMenuClick} isMobile={isMobile} />
      <Toolbar />
      <Box
        id='main-content'
        component='main'
        sx={{ p: 3, pb: '88px', bgcolor: 'background.default', minWidth: 0 }}
      >
        <PageTransition>{children}</PageTransition>
      </Box>
    </>
  );
}
