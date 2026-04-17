import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Box,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';

import { Link, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/' },
  { label: 'Zadania', icon: TaskIcon, path: '/todos' },
];

export default function Sidebar({
  open,
  onClose,
  variant,
}: {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
}) {
  const location = useLocation();

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{ width: DRAWER_WIDTH }}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
            color: 'white',
          },
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6">32032 TodoApp</Typography>
      </Toolbar>

      <Divider />

      <List>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              aria-label={item.label}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                <Icon />
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.dark' }}>U</Avatar>
        <Typography variant="body2">Użytkownik</Typography>
      </Box>
    </Drawer>
  );
}
