import { useState } from 'react';
import { Box, TextField, Button, Typography, Stack, Paper, Alert, CircularProgress } from '@mui/material';
import { usePlaygrounds } from '../api/playgrounds';
import FigmaDropZone from './FigmaDropZone';
import SessionUploadZone from './SessionUploadZone';
import { defaultPlaygroundTheme } from '../theme';
import type { SessionUpload } from '../types';

interface Props {
  onClose: () => void;
}

export default function PlaygroundForm({ onClose }: Props) {
  const { createPlayground } = usePlaygrounds();
  const [clientName, setClientName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [figmaLink, setFigmaLink] = useState('');
  const [notes, setNotes] = useState('');
  const [sessionUploads, setSessionUploads] = useState<SessionUpload[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setError('Client name is required');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const pg = createPlayground({
        clientName: clientName.trim(),
        brandDescription: brandDescription.trim(),
        websiteUrl: websiteUrl.trim() || undefined,
        figmaLink: figmaLink.trim() || undefined,
        notes: notes.trim() || undefined,
        sessionUploads: sessionUploads.length > 0 ? sessionUploads : undefined,
        theme: defaultPlaygroundTheme,
        status: 'active',
      });
      setShareLink(`${window.location.origin}/${pg.shareId}`);
    } catch {
      setError('Failed to create playground');
    } finally {
      setLoading(false);
    }
  };

  if (shareLink) {
    return (
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Alert severity="success" sx={{ mb: 2 }}>Playground created successfully!</Alert>
        <Typography variant="body1" gutterBottom>Share this link with your client:</Typography>
        <TextField
          fullWidth
          value={shareLink}
          slotProps={{ input: { readOnly: true } }}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigator.clipboard.writeText(shareLink)}>
            Copy Link
          </Button>
          <Button variant="outlined" onClick={onClose}>Back to Dashboard</Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>Create New Playground</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Client / Brand Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Brand Description"
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
          <TextField
            label="Website URL (for AI style extraction)"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            type="url"
            fullWidth
            placeholder="https://example.com"
          />
          <FigmaDropZone value={figmaLink} onChange={setFigmaLink} />
          <SessionUploadZone uploads={sessionUploads} onChange={setSessionUploads} />
          <TextField
            label="Internal Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Create Playground'}
            </Button>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
