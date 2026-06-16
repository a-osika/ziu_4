import { Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import StatsGrid from '../components/dashboard/StatsGrid';
import RecentTodosTimeline from '../components/dashboard/RecentTodosTimeline';

export default function DashboardPage() {
  return (
    <>
      <Typography component='h1' sx={visuallyHidden}>
        Dashboard
      </Typography>
      <StatsGrid />
      <Box sx={{ mt: 4 }}>
        <RecentTodosTimeline />
      </Box>
    </>
  );
}
