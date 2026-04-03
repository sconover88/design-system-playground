import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack } from '@mui/material';

export default function RadioDemo() {
  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Choose an option</FormLabel>
        <RadioGroup defaultValue="a" row>
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
          <FormControlLabel value="c" control={<Radio />} label="Option C" />
          <FormControlLabel value="d" control={<Radio disabled />} label="Disabled" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Colors</FormLabel>
        <RadioGroup defaultValue="primary" row>
          <FormControlLabel value="primary" control={<Radio />} label="Primary" />
          <FormControlLabel value="secondary" control={<Radio color="secondary" />} label="Secondary" />
          <FormControlLabel value="success" control={<Radio color="success" />} label="Success" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
