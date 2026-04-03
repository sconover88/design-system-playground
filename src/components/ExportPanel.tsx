import { Box, Typography, Button, Stack, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { usePlaygroundTheme } from '../context/ThemeContext';
import { exportThemeJSON, downloadThemeFile, copyToClipboard } from '../utils/exportUtils';

export default function ExportPanel() {
  const { playgroundTheme } = usePlaygroundTheme();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const showSnack = (msg: string) => {
    setSnackMsg(msg);
    setSnackOpen(true);
  };

  const handleCopyJSON = async () => {
    const json = exportThemeJSON(playgroundTheme);
    await copyToClipboard(json);
    showSnack('Theme JSON copied to clipboard!');
  };

  const handleDownload = () => {
    downloadThemeFile(playgroundTheme);
    showSnack('Theme file downloaded!');
  };

  const handleCopyMuiCode = async () => {
    const code = `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: '${playgroundTheme.mode}',
    primary: { main: '${playgroundTheme.primaryColor}' },
    secondary: { main: '${playgroundTheme.secondaryColor}' },
  },
  typography: {
    fontFamily: '${playgroundTheme.fontFamily}',
  },
  shape: {
    borderRadius: ${playgroundTheme.borderRadius},
  },
});

export default theme;`;
    await copyToClipboard(code);
    showSnack('MUI theme code copied to clipboard!');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Export</Typography>
      <Stack spacing={2}>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyJSON} fullWidth>
          Copy Theme JSON
        </Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyMuiCode} fullWidth>
          Copy MUI Theme Code
        </Button>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} fullWidth>
          Download Theme File
        </Button>
        <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.100', borderRadius: 1, maxHeight: 200, overflow: 'auto' }}>
          <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'text.primary' }}>
            {exportThemeJSON(playgroundTheme)}
          </Typography>
        </Box>
      </Stack>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={() => setSnackOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setSnackOpen(false)}>{snackMsg}</Alert>
      </Snackbar>
    </Box>
  );
}
