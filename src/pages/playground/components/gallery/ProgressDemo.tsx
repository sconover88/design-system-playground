import { CircularProgress, LinearProgress, Stack, Typography, Box } from '@mui/material';

export default function ProgressDemo() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} alignItems="center">
        <CircularProgress />
        <CircularProgress color="secondary" />
        <CircularProgress variant="determinate" value={75} />
        <CircularProgress size={20} />
      </Stack>
      <Box>
        <Typography gutterBottom>Linear Indeterminate</Typography>
        <LinearProgress />
      </Box>
      <Box>
        <Typography gutterBottom>Linear Determinate (60%)</Typography>
        <LinearProgress variant="determinate" value={60} />
      </Box>
      <Box>
        <Typography gutterBottom>Linear Buffer</Typography>
        <LinearProgress variant="buffer" value={50} valueBuffer={70} />
      </Box>
      <Box>
        <Typography gutterBottom>Secondary Color</Typography>
        <LinearProgress color="secondary" />
      </Box>
    </Stack>
  );
}
