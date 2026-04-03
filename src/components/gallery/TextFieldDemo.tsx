import { TextField, Stack } from '@mui/material';

export default function TextFieldDemo() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <TextField label="Standard" variant="standard" />
        <TextField label="Filled" variant="filled" />
        <TextField label="Outlined" variant="outlined" />
      </Stack>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <TextField label="Small" size="small" />
        <TextField label="Normal" />
        <TextField label="Disabled" disabled />
        <TextField label="Error" error helperText="Something went wrong" />
      </Stack>
      <TextField label="Full Width" fullWidth />
      <TextField label="Multiline" multiline rows={3} />
      <TextField label="Password" type="password" />
    </Stack>
  );
}
