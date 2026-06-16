import { Box, Container, Paper, Toolbar } from '@mui/material';
import AppHeader from '../dashboard/AppHeader';
import { PageTransition } from '../PageTransition';

export default function AuthLayout({
  children,
  onMenuClick,
  isMobile,
}: {
  children: React.ReactNode;
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
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <PageTransition>
          <Container maxWidth='sm'>
            <Paper sx={{ p: 4 }} component='section' aria-label='Zawartość'>
              {children}
            </Paper>
          </Container>
        </PageTransition>
      </Box>
    </>
  );
}
