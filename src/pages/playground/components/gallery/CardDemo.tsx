import { Card, CardContent, CardActions, CardMedia, CardHeader, Button, Typography, Avatar, Stack } from '@mui/material';

export default function CardDemo() {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography variant="h6">Simple Card</Typography>
          <Typography variant="body2" color="text.secondary">
            This is a basic card with some text content.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>R</Avatar>} title="Card Header" subheader="September 14, 2024" />
        <CardMedia component="div" sx={{ height: 120, bgcolor: 'grey.300' }} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Card with header, media placeholder, and actions.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Card variant="outlined" sx={{ maxWidth: 300 }}>
        <CardContent>
          <Typography variant="h6">Outlined Card</Typography>
          <Typography variant="body2" color="text.secondary">
            An outlined variant of the card component.
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
