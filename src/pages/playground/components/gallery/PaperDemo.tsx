import { Paper, Stack, Typography } from '@mui/material';

export default function PaperDemo() {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {[0, 1, 3, 6, 12, 24].map((elevation) => (
        <Paper key={elevation} elevation={elevation} sx={{ p: 2, width: 120, textAlign: 'center' }}>
          <Typography variant="body2">elevation={elevation}</Typography>
        </Paper>
      ))}
      <Paper variant="outlined" sx={{ p: 2, width: 120, textAlign: 'center' }}>
        <Typography variant="body2">outlined</Typography>
      </Paper>
    </Stack>
  );
}
