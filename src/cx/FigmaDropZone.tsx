import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FigmaDropZone({ value, onChange }: Props) {
  return (
    <Box>
      <Typography variant="body2" gutterBottom>Figma File / Link (optional)</Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center',
          borderStyle: 'dashed',
          bgcolor: 'grey.50',
          cursor: 'pointer',
        }}
      >
        <Stack spacing={1} alignItems="center">
          <CloudUploadIcon color="action" />
          <Typography variant="body2" color="text.secondary">
            Paste a Figma link below for AI-powered style extraction
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://www.figma.com/file/..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Stack>
      </Paper>
    </Box>
  );
}
