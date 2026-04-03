import { Slider, Stack, Typography, Box } from '@mui/material';

export default function SliderDemo() {
  return (
    <Stack spacing={3} sx={{ px: 2 }}>
      <Box>
        <Typography gutterBottom>Default</Typography>
        <Slider defaultValue={30} aria-label="Default slider" />
      </Box>
      <Box>
        <Typography gutterBottom>Discrete (steps of 10)</Typography>
        <Slider defaultValue={30} step={10} marks min={0} max={100} aria-label="Discrete slider" />
      </Box>
      <Box>
        <Typography gutterBottom>Range</Typography>
        <Slider defaultValue={[20, 60]} aria-label="Range slider" />
      </Box>
      <Box>
        <Typography gutterBottom>Disabled</Typography>
        <Slider defaultValue={50} disabled aria-label="Disabled slider" />
      </Box>
      <Box>
        <Typography gutterBottom>Small</Typography>
        <Slider defaultValue={40} size="small" color="secondary" aria-label="Small slider" />
      </Box>
    </Stack>
  );
}
