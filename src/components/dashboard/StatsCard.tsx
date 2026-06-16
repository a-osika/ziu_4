import { Card, CardContent, Typography, Box, Avatar, SvgIconTypeMap } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type PaletteColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

interface StatsCardProps {
  title: string;
  value: number;
  icon: OverridableComponent<SvgIconTypeMap>;
  color: PaletteColor;
}

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <Card sx={{ aspectRatio: '16/9' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography component='p' variant='h4'>
              {value}
            </Typography>
          </Box>
          <Avatar
            aria-hidden='true'
            sx={(theme) => ({
              bgcolor: alpha(theme.palette[color].main, 0.12),
              color: theme.palette[color].main,
              width: 48,
              height: 48,
            })}
          >
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}
