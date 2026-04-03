import { Grid, Paper, Typography } from '@mui/material';

export default function GridDemo() {
  return (
    <Grid container spacing={2}>
      {[12, 6, 6, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2].map((size, i) => (
        <Grid key={i} size={{ xs: 12, sm: size }}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="body2">xs=12 sm={size}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
