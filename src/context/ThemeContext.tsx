import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { PlaygroundTheme } from '../types';
import { defaultPlaygroundTheme, buildMuiTheme } from '../theme';

interface ThemeContextValue {
  playgroundTheme: PlaygroundTheme;
  setPlaygroundTheme: React.Dispatch<React.SetStateAction<PlaygroundTheme>>;
  updateThemeField: <K extends keyof PlaygroundTheme>(key: K, value: PlaygroundTheme[K]) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function usePlaygroundTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('usePlaygroundTheme must be used within ThemeContextProvider');
  return ctx;
}

export function ThemeContextProvider({ children, initial }: { children: React.ReactNode; initial?: PlaygroundTheme }) {
  const [playgroundTheme, setPlaygroundTheme] = useState<PlaygroundTheme>(initial ?? defaultPlaygroundTheme);

  const updateThemeField = useCallback(<K extends keyof PlaygroundTheme>(key: K, value: PlaygroundTheme[K]) => {
    setPlaygroundTheme((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetTheme = useCallback(() => {
    setPlaygroundTheme(initial ?? defaultPlaygroundTheme);
  }, [initial]);

  const muiTheme = useMemo(() => buildMuiTheme(playgroundTheme), [playgroundTheme]);

  const value = useMemo(
    () => ({ playgroundTheme, setPlaygroundTheme, updateThemeField, resetTheme }),
    [playgroundTheme, updateThemeField, resetTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
