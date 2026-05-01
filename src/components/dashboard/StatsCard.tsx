import { Card, CardContent, Typography, Box, Avatar, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface StatsCardProps {
  title: string;
  value: number;
  icon: OverridableComponent<SvgIconTypeMap>;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <article>
      <Card sx={{ aspectRatio: '16/9' }}>
        <CardContent>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            role='region'
            aria-label={`${title}: ${value}`}
          >
            <Box>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                {title}
              </Typography>

              <Typography variant='h4' aria-label={`Liczba: ${value}`}>
                {value}
              </Typography>
            </Box>

            <Avatar
              sx={{ bgcolor: bgColor, color, width: 48, height: 48 }}
              aria-hidden='true'
            >
              <Icon />
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </article>
  );
}
