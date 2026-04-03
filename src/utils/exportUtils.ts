import { saveAs } from 'file-saver';
import type { PlaygroundTheme } from '../types';

export function exportThemeJSON(theme: PlaygroundTheme): string {
  return JSON.stringify(
    {
      palette: {
        mode: theme.mode,
        primary: { main: theme.primaryColor },
        secondary: { main: theme.secondaryColor },
      },
      typography: {
        fontFamily: theme.fontFamily,
      },
      shape: {
        borderRadius: theme.borderRadius,
      },
    },
    null,
    2,
  );
}

export function downloadThemeFile(theme: PlaygroundTheme) {
  const json = exportThemeJSON(theme);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  saveAs(blob, 'mui-theme.json');
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
