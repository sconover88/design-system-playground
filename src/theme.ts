import { createTheme } from '@mui/material/styles';
import type { PlaygroundTheme } from './types';

export const defaultPlaygroundTheme: PlaygroundTheme = {
  primaryColor: '#1976d2',
  secondaryColor: '#9c27b0',
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 8,
  mode: 'light',
};

export function buildMuiTheme(pt: PlaygroundTheme) {
  return createTheme({
    palette: {
      mode: pt.mode,
      primary: { main: pt.primaryColor },
      secondary: { main: pt.secondaryColor },
    },
    typography: {
      fontFamily: pt.fontFamily,
    },
    shape: {
      borderRadius: pt.borderRadius,
    },
  });
}
