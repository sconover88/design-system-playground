import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';

export default function CheckboxDemo() {
  return (
    <Stack spacing={2}>
      <FormGroup row>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
        <FormControlLabel control={<Checkbox />} label="Unchecked" />
        <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
        <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Secondary" />
        <FormControlLabel control={<Checkbox color="success" defaultChecked />} label="Success" />
        <FormControlLabel control={<Checkbox color="error" defaultChecked />} label="Error" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Small" />
        <FormControlLabel control={<Checkbox size="medium" defaultChecked />} label="Medium" />
      </FormGroup>
    </Stack>
  );
}
