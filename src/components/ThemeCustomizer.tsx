import { Box, Typography, Slider, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button, Stack } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { usePlaygroundTheme } from '../providers/ThemeProvider';
import { useRef, useEffect } from 'react';

const fontOptions = [
  'Roboto, sans-serif',
  'Inter, sans-serif',
  'Poppins, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Montserrat, sans-serif',
  'Playfair Display, serif',
  'Georgia, serif',
  'monospace',
];

function DeferredColorPicker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync the input when the external value changes (e.g. theme reset)
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = value;
  }, [value]);

  return (
    <Box>
      <Typography variant="body2" gutterBottom>{label}</Typography>
      <input
        ref={inputRef}
        type="color"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        style={{
          width: '100%',
          height: 40,
          padding: 0,
          border: '1px solid rgba(0,0,0,0.23)',
          borderRadius: 4,
          cursor: 'pointer',
          background: 'none',
        }}
      />
    </Box>
  );
}

export default function ThemeCustomizer() {
  const { playgroundTheme, updateThemeField, resetTheme } = usePlaygroundTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Theme Customizer</Typography>
      <Stack spacing={3}>
        <DeferredColorPicker
          label="Primary Color"
          value={playgroundTheme.primaryColor}
          onChange={(v) => updateThemeField('primaryColor', v)}
        />
        <DeferredColorPicker
          label="Secondary Color"
          value={playgroundTheme.secondaryColor}
          onChange={(v) => updateThemeField('secondaryColor', v)}
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Font Family</InputLabel>
          <Select
            value={playgroundTheme.fontFamily}
            label="Font Family"
            onChange={(e) => updateThemeField('fontFamily', e.target.value)}
          >
            {fontOptions.map((f) => (
              <MenuItem key={f} value={f} sx={{ fontFamily: f }}>{f.split(',')[0]}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Typography variant="body2" gutterBottom>Border Radius: {playgroundTheme.borderRadius}px</Typography>
          <Slider
            value={playgroundTheme.borderRadius}
            min={0}
            max={24}
            onChange={(_: Event, v: number | number[]) => updateThemeField('borderRadius', v as number)}
            aria-label="Border radius"
          />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={playgroundTheme.mode === 'dark'}
              onChange={(_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => updateThemeField('mode', checked ? 'dark' : 'light')}
            />
          }
          label="Dark Mode"
        />
        <Button variant="outlined" startIcon={<RestoreIcon />} onClick={resetTheme} size="small">
          Reset to Default
        </Button>
      </Stack>
    </Box>
  );
}
