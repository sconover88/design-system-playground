import { Switch, FormControlLabel, FormGroup, Stack } from '@mui/material';

export default function SwitchDemo() {
  return (
    <Stack spacing={2}>
      <FormGroup row>
        <FormControlLabel control={<Switch defaultChecked />} label="On" />
        <FormControlLabel control={<Switch />} label="Off" />
        <FormControlLabel control={<Switch disabled />} label="Disabled" />
        <FormControlLabel control={<Switch disabled defaultChecked />} label="Disabled On" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Switch color="secondary" defaultChecked />} label="Secondary" />
        <FormControlLabel control={<Switch color="success" defaultChecked />} label="Success" />
        <FormControlLabel control={<Switch color="warning" defaultChecked />} label="Warning" />
        <FormControlLabel control={<Switch color="error" defaultChecked />} label="Error" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Switch size="small" defaultChecked />} label="Small" />
        <FormControlLabel control={<Switch defaultChecked />} label="Medium" />
      </FormGroup>
    </Stack>
  );
}
