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

import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import TaskIcon from '@mui/icons-material/TaskOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';

import { Link, useLocation } from 'react-router-dom';
import LockOpen from '@mui/icons-material/LockOpenOutlined';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/' },
  { label: 'Zadania', icon: TaskIcon, path: '/todos' },
  { label: 'Zarejestruj się', icon: LockOpen, path: '/register' },
];

export default function Sidebar({
  open,
  onClose,
  variant,
  paperWidth = DRAWER_WIDTH,
}: {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'temporary';
  paperWidth?: number;
}) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { showToast } = useSnackbar();

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{ width: paperWidth, transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1)' }}
      role='navigation'
      aria-label='Menu główne'
      slotProps={{
        paper: {
          sx: {
            width: paperWidth,
            overflow: 'hidden',
            transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1)',
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
            color: 'white',
            borderRight: 'none',
          },
          role: variant === 'temporary' ? 'dialog' : 'navigation',
          'aria-modal': variant === 'temporary' ? true : undefined,
        },
      }}
    >
      <Toolbar>
        <Typography variant='h6'>32032 TodoApp</Typography>
      </Toolbar>

      <Divider />

      <List component='nav'>
        {navItems
          .filter((item) => !(user && item.path === '/register'))
          .map((item) => {
            const Icon = item.icon;
            return (
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                aria-label={item.label}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Icon aria-hidden='true' />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        {user && (
          <ListItemButton
            onClick={() => {
              logout();
              showToast('Wylogowano pomyślnie', 'info');
            }}
            aria-label='Wyloguj się'
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Wyloguj się' />
          </ListItemButton>
        )}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.dark' }}>
          {user ? user.name[0].toUpperCase() : 'G'}
        </Avatar>
        {user ? (
          <Typography variant='body2'>{user.name}</Typography>
        ) : (
          <Typography sx={{ color: 'white', textDecoration: 'none' }}>Gość</Typography>
        )}
      </Box>
    </Drawer>
  );
}
