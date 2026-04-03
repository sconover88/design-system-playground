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

/**
 * Generate and download a Figma Tokens–compatible JSON file.
 * Compatible with the Tokens Studio for Figma plugin.
 * See: https://docs.tokens.studio/
 */
export function exportFigmaTokensJSON(theme: PlaygroundTheme): string {
  const tokens = {
    global: {
      colors: {
        primary: { value: theme.primaryColor, type: 'color' },
        secondary: { value: theme.secondaryColor, type: 'color' },
      },
      borderRadius: {
        default: { value: `${theme.borderRadius}px`, type: 'borderRadius' },
      },
      fontFamilies: {
        default: { value: theme.fontFamily, type: 'fontFamilies' },
      },
      theme: {
        mode: { value: theme.mode, type: 'other' },
      },
    },
    '$themes': [
      {
        id: 'design-system-playground',
        name: theme.mode === 'dark' ? 'Dark' : 'Light',
        selectedTokenSets: { global: 'enabled' },
      },
    ],
    '$metadata': {
      tokenSetOrder: ['global'],
    },
  };
  return JSON.stringify(tokens, null, 2);
}

export function downloadFigmaTokens(theme: PlaygroundTheme) {
  const json = exportFigmaTokensJSON(theme);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  saveAs(blob, 'figma-tokens.json');
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
