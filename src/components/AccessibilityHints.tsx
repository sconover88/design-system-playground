import { Box, Typography, Alert, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { usePlaygroundTheme } from '../providers/ThemeProvider';
import { useMemo } from 'react';

function getContrastRatio(hex1: string, hex2: string): number {
  const lum = (hex: string) => {
    const rgb = hex.replace('#', '').match(/.{2}/g)!.map((c) => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = lum(hex1);
  const l2 = lum(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface Hint {
  severity: 'success' | 'warning' | 'error';
  text: string;
}

export default function AccessibilityHints() {
  const { playgroundTheme } = usePlaygroundTheme();

  const hints = useMemo<Hint[]>(() => {
    const result: Hint[] = [];
    const bgColor = playgroundTheme.mode === 'dark' ? '#121212' : '#ffffff';

    const primaryRatio = getContrastRatio(playgroundTheme.primaryColor, bgColor);
    if (primaryRatio >= 4.5) {
      result.push({ severity: 'success', text: `Primary color contrast ratio: ${primaryRatio.toFixed(2)}:1 (WCAG AA pass)` });
    } else if (primaryRatio >= 3) {
      result.push({ severity: 'warning', text: `Primary color contrast ratio: ${primaryRatio.toFixed(2)}:1 (passes for large text, fails WCAG AA for normal text)` });
    } else {
      result.push({ severity: 'error', text: `Primary color contrast ratio: ${primaryRatio.toFixed(2)}:1 (fails WCAG AA — consider a darker shade)` });
    }

    const secondaryRatio = getContrastRatio(playgroundTheme.secondaryColor, bgColor);
    if (secondaryRatio >= 4.5) {
      result.push({ severity: 'success', text: `Secondary color contrast ratio: ${secondaryRatio.toFixed(2)}:1 (WCAG AA pass)` });
    } else if (secondaryRatio >= 3) {
      result.push({ severity: 'warning', text: `Secondary color contrast ratio: ${secondaryRatio.toFixed(2)}:1 (large text only)` });
    } else {
      result.push({ severity: 'error', text: `Secondary color contrast ratio: ${secondaryRatio.toFixed(2)}:1 (fails WCAG AA)` });
    }

    if (playgroundTheme.borderRadius > 16) {
      result.push({ severity: 'warning', text: 'Very large border radius may make interactive elements harder to identify' });
    } else {
      result.push({ severity: 'success', text: 'Border radius is within accessible range' });
    }

    result.push({ severity: 'success', text: 'All MUI components include built-in ARIA attributes' });

    return result;
  }, [playgroundTheme]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Accessibility Hints</Typography>
      <Alert severity="info" sx={{ mb: 2 }} icon={false}>
        <span>These hints are based on WCAG 2.1 guidelines for your current theme settings.</span>
      </Alert>
      <List dense>
        {hints.map((hint, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              {hint.severity === 'success' ? <CheckCircleIcon color="success" /> : <WarningIcon color={hint.severity} />}
            </ListItemIcon>
            <ListItemText primary={hint.text} />
          </ListItem>
        ))}
      </List>
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="subtitle2">General WCAG 2.1 Recommendations:</Typography>
        <Typography variant="body2">• Ensure all interactive elements are keyboard accessible</Typography>
        <Typography variant="body2">• Provide visible focus indicators</Typography>
        <Typography variant="body2">• Use semantic HTML elements</Typography>
        <Typography variant="body2">• Ensure text is resizable up to 200% without loss of content</Typography>
        <Typography variant="body2">• Provide sufficient color contrast (4.5:1 for normal text, 3:1 for large text)</Typography>
      </Stack>
    </Box>
  );
}
