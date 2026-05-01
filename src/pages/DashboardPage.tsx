import { Box } from '@mui/material';
import StatsGrid from '../components/dashboard/StatsGrid';
import RecentTodosTimeline from '../components/dashboard/RecentTodosTimeline';

export default function DashboardPage() {
  return (
    <main>
      <h1 style={{ position: 'absolute', left: '-10000px' }}>Dashboard</h1>
      <StatsGrid />
      <Box sx={{ mt: 4 }} role='region' aria-label='Historia ostatnich zadań'>
        <RecentTodosTimeline />
      </Box>
    </main>
  );
}
