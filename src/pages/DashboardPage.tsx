import { Box } from '@mui/material';
import StatsGrid from '../components/dashboard/StatsGrid';
import RecentTodosTimeline from '../components/dashboard/RecentTodosTimeline';

export default function DashboardPage() {
  return (
    <>
      <StatsGrid />
      <Box sx={{ mt: 4 }}>
        <RecentTodosTimeline />
      </Box>
    </>
  );
}
