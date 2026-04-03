import { Typography, Stack } from '@mui/material';

export default function TypographyDemo() {
  return (
    <Stack spacing={1}>
      <Typography variant="h1">h1. Heading</Typography>
      <Typography variant="h2">h2. Heading</Typography>
      <Typography variant="h3">h3. Heading</Typography>
      <Typography variant="h4">h4. Heading</Typography>
      <Typography variant="h5">h5. Heading</Typography>
      <Typography variant="h6">h6. Heading</Typography>
      <Typography variant="subtitle1">subtitle1. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="subtitle2">subtitle2. Lorem ipsum dolor sit amet</Typography>
      <Typography variant="body1">body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      <Typography variant="body2">body2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
      <Typography variant="button" display="block">button text</Typography>
      <Typography variant="caption" display="block">caption text</Typography>
      <Typography variant="overline" display="block">overline text</Typography>
    </Stack>
  );
}
