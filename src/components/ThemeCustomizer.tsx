import { Box, Typography, Slider, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel, Button, Stack, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { usePlaygroundTheme } from '../context/ThemeContext';

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

export default function ThemeCustomizer() {
  const { playgroundTheme, updateThemeField, resetTheme } = usePlaygroundTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Theme Customizer</Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant="body2" gutterBottom>Primary Color</Typography>
          <TextField
            type="color"
            value={playgroundTheme.primaryColor}
            onChange={(e) => updateThemeField('primaryColor', e.target.value)}
            size="small"
            fullWidth
            slotProps={{ input: { sx: { height: 40 } } }}
          />
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>Secondary Color</Typography>
          <TextField
            type="color"
            value={playgroundTheme.secondaryColor}
            onChange={(e) => updateThemeField('secondaryColor', e.target.value)}
            size="small"
            fullWidth
            slotProps={{ input: { sx: { height: 40 } } }}
          />
        </Box>
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
            onChange={(_, v) => updateThemeField('borderRadius', v as number)}
            aria-label="Border radius"
          />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={playgroundTheme.mode === 'dark'}
              onChange={(e) => updateThemeField('mode', e.target.checked ? 'dark' : 'light')}
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
