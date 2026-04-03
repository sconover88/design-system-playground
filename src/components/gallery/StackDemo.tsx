import { Stack, Paper, Typography

 } from '@mui/material';

export default function StackDemo() {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2">Horizontal Stack</Typography>
      <Stack direction="row" spacing={2}>
        <Paper sx={{ p: 2 }}>Item 1</Paper>
        <Paper sx={{ p: 2 }}>Item 2</Paper>
        <Paper sx={{ p: 2 }}>Item 3</Paper>
      </Stack>
      <Typography variant="subtitle2">Vertical Stack</Typography>
      <Stack spacing={1}>
        <Paper sx={{ p: 2 }}>Item A</Paper>
        <Paper sx={{ p: 2 }}>Item B</Paper>
        <Paper sx={{ p: 2 }}>Item C</Paper>
      </Stack>
      <Typography variant="subtitle2">Responsive Direction</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Paper sx={{ p: 2 }}>Responsive 1</Paper>
        <Paper sx={{ p: 2 }}>Responsive 2</Paper>
        <Paper sx={{ p: 2 }}>Responsive 3</Paper>
      </Stack>
    </Stack>
  );
}
