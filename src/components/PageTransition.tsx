import { ReactNode } from 'react';
import { Box, Fade, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <Fade in appear key={location.pathname} timeout={reduceMotion ? 0 : 400}>
      <Box sx={{ width: '100%' }}>{children}</Box>
    </Fade>
  );
}
