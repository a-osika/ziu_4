import { Box, Container, Paper, Toolbar } from '@mui/material';
import AppHeader from '../dashboard/AppHeader';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader onMenuClick={() => {}} isMobile={false} />
      <Toolbar />
      <Box
        id='main-content'
        component='main'
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth='sm'>
          <Paper sx={{ p: 4 }} component='section' aria-label='Zawartość'>
            {children}
          </Paper>
        </Container>
      </Box>
    </>
  );
}
