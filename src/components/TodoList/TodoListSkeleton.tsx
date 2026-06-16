import { List, ListItem, Skeleton, Box, Paper } from '@mui/material';

export function TodoListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <Paper variant='outlined' sx={{ overflow: 'hidden' }} aria-hidden='true'>
      <List disablePadding>
        {Array.from({ length: count }).map((_, i) => (
          <ListItem key={i} divider={i !== count - 1} sx={{ gap: 1, px: 2, py: 1.5 }}>
            <Skeleton variant='circular' width={24} height={24} sx={{ mr: 1, flexShrink: 0 }} />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Skeleton variant='text' width='55%' />
              <Skeleton variant='text' width='35%' />
            </Box>

            <Skeleton variant='rounded' width={72} height={24} sx={{ flexShrink: 0 }} />

            <Skeleton variant='circular' width={32} height={32} sx={{ ml: 1, flexShrink: 0 }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
