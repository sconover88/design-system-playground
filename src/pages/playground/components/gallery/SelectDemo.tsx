import { Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';
import { useState } from 'react';

export default function SelectDemo() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('20');

  return (
    <Stack spacing={2} direction="row" flexWrap="wrap" useFlexGap>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="select-label">Age</InputLabel>
        <Select labelId="select-label" value={val1} label="Age" onChange={(e) => setVal1(e.target.value as string)}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }} variant="filled">
        <InputLabel id="select-filled-label">Filled</InputLabel>
        <Select labelId="select-filled-label" value={val2} onChange={(e) => setVal2(e.target.value as string)}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }} disabled>
        <InputLabel>Disabled</InputLabel>
        <Select label="Disabled" value="">
          <MenuItem value="">None</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
