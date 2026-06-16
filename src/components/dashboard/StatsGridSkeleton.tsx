import { Grid, Card, CardContent, Box, Skeleton } from '@mui/material';

export default function StatsGridSkeleton() {
  return (
    <Box component='section' aria-label='Statystyki zadań' aria-busy='true'>
      <Grid container spacing={3}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ aspectRatio: '16/9' }} aria-hidden='true'>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Skeleton variant='text' width={120} />
                    <Skeleton variant='text' width={64} height={44} />
                  </Box>
                  <Skeleton variant='circular' width={48} height={48} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
