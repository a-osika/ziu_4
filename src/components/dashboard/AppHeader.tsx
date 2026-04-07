import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { ThemeToggle } from '../../components/ThemeToggle';

export default function AppHeader() {
  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Dashboard</Typography>

        <Box>
          <ThemeToggle />
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
