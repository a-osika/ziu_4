import { useMemo } from 'react';
import { useTodoContext } from '../../context/TodoContext';

import { Paper, Typography } from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

export default function RecentTodosTimeline() {
  const { todos } = useTodoContext();

  const recentTodos = useMemo(() => {
    return [...todos]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [todos]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Ostatnie zadania
      </Typography>

      <Timeline>
        {recentTodos.map((todo, index) => (
          <TimelineItem key={todo.id}>
            <TimelineSeparator>
              <TimelineDot color={todo.completed ? 'success' : 'primary'} />
              {index < recentTodos.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant='body2'>{todo.title}</Typography>

              <Typography variant='caption' color='text.secondary'>
                {new Date(todo.createdAt).toLocaleDateString()}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
}
