import { Box, Grid } from '@mui/material';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import StatsCard from './StatsCard';
import { useTodoContext } from '../../context/TodoContext';
import StatsGridSkeleton from './StatsGridSkeleton';

export default function StatsGrid() {
  const { todos, loading } = useTodoContext();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  if (loading) {
    return <StatsGridSkeleton />;
  }

  return (
    <Box component='section' aria-label='Statystyki zadań'>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard
            title='Wszystkie zadania'
            value={total}
            icon={FormatListBulletedIcon}
            color='info'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard title='Ukończone' value={completed} icon={CheckCircleIcon} color='success' />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard
            title='Oczekujące'
            value={pending}
            icon={RadioButtonUncheckedIcon}
            color='warning'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
