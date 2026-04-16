import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ThemeToggle } from '../../components/ThemeToggle';

export default function AppHeader({
  onMenuClick,
  isMobile,
}: {
  onMenuClick: () => void;
  isMobile: boolean;
}) {
  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton onClick={onMenuClick}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6">Dashboard</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
