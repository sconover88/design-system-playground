import { Divider, Stack, Typography, Chip } from '@mui/material';

export default function DividerDemo() {
  return (
    <Stack spacing={2}>
      <Typography>Full-width Divider:</Typography>
      <Divider />
      <Typography>Middle Variant:</Typography>
      <Divider variant="middle" />
      <Typography>With text:</Typography>
      <Divider>CENTER</Divider>
      <Divider textAlign="left">LEFT</Divider>
      <Divider textAlign="right">RIGHT</Divider>
      <Divider>
        <Chip label="CHIP" size="small" />
      </Divider>
      <Typography>Vertical (in a row):</Typography>
      <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
        <Typography>Item 1</Typography>
        <Typography>Item 2</Typography>
        <Typography>Item 3</Typography>
      </Stack>
    </Stack>
  );
}
