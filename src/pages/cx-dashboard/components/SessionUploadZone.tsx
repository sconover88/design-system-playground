import { useState, useRef } from 'react';
import {
  Box, Typography, Stack, Paper, Chip, IconButton, Alert, LinearProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import type { SessionUpload } from '../../../types';

const ACCEPT_STRING = '.txt,.vtt,.srt,.csv,.json,.md,.mp4,.webm,.mov,.mp3,.wav';
const MAX_TEXT_SIZE = 5 * 1024 * 1024; // 5MB for text files
const MAX_MEDIA_SIZE = 500 * 1024 * 1024; // 500MB for media files

function parseVTTorSRT(text: string): string {
  // Strip timestamps, cue numbers, and WebVTT/SRT headers
  return text
    .replace(/^WEBVTT.*$/m, '')
    .replace(/^\d+\s*$/gm, '')
    .replace(/[\d:.,-]+\s*-->\s*[\d:.,-]+/g, '')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');
}

interface Props {
  uploads: SessionUpload[];
  onChange: (uploads: SessionUpload[]) => void;
}

export default function SessionUploadZone({ uploads, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = async (files: FileList) => {
    setError('');
    const newUploads: SessionUpload[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const isMedia = ['mp4', 'webm', 'mov', 'mp3', 'wav'].includes(ext);
      const maxSize = isMedia ? MAX_MEDIA_SIZE : MAX_TEXT_SIZE;

      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds the ${isMedia ? '500MB' : '5MB'} size limit.`);
        continue;
      }

      if (isMedia) {
        // For media files, store a placeholder — in production this would go through a
        // speech-to-text service (Whisper, Google STT, etc.)
        newUploads.push({
          id: uuidv4(),
          filename: file.name,
          type: 'video',
          content: `[Media file uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB). In production, this would be transcribed using a speech-to-text service.]`,
          uploadedAt: new Date().toISOString(),
        });
      } else {
        setProcessing(true);
        try {
          let text = await file.text();

          // Parse subtitle formats into plain text
          if (ext === 'vtt' || ext === 'srt') {
            text = parseVTTorSRT(text);
          }

          // For JSON, try to extract meaningful text
          if (ext === 'json') {
            try {
              const parsed = JSON.parse(text);
              // Common transcript JSON formats
              if (Array.isArray(parsed)) {
                text = parsed.map((item: Record<string, unknown>) =>
                  typeof item === 'string' ? item : (item.text || item.content || item.message || JSON.stringify(item))
                ).join('\n');
              } else if (typeof parsed === 'object' && parsed !== null) {
                text = JSON.stringify(parsed, null, 2);
              }
            } catch {
              // Keep as-is if not valid JSON
            }
          }

          newUploads.push({
            id: uuidv4(),
            filename: file.name,
            type: 'transcript',
            content: text,
            uploadedAt: new Date().toISOString(),
          });
        } catch {
          setError(`Failed to read file "${file.name}".`);
        } finally {
          setProcessing(false);
        }
      }
    }

    if (newUploads.length > 0) {
      onChange([...uploads, ...newUploads]);
    }
  };

  const handleRemove = (id: string) => {
    onChange(uploads.filter((u) => u.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <Box>
      <Typography variant="body2" gutterBottom>Session Transcripts / Recordings</Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          textAlign: 'center',
          borderStyle: 'dashed',
          bgcolor: 'grey.50',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'grey.100' },
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Stack spacing={1} alignItems="center">
          <CloudUploadIcon color="action" sx={{ fontSize: 36 }} />
          <Typography variant="body2" color="text.secondary">
            Drag & drop transcript or recording files here, or click to browse
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Supports: .txt, .vtt, .srt, .json, .csv, .md, .mp4, .webm, .mov, .mp3, .wav
          </Typography>
        </Stack>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT_STRING}
          multiple
          hidden
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </Paper>

      {processing && <LinearProgress sx={{ mt: 1 }} />}
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

      {uploads.length > 0 && (
        <Stack spacing={1} sx={{ mt: 1.5 }}>
          {uploads.map((upload) => (
            <Paper key={upload.id} variant="outlined" sx={{ px: 2, py: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {upload.type === 'video' ? <VideoFileIcon color="action" /> : <DescriptionIcon color="action" />}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" noWrap>{upload.filename}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {upload.type === 'transcript'
                      ? `${upload.content.length.toLocaleString()} characters`
                      : 'Media file'}
                    {' · '}
                    {new Date(upload.uploadedAt).toLocaleString()}
                  </Typography>
                </Box>
                <Chip label={upload.type} size="small" variant="outlined" />
                <IconButton size="small" onClick={() => handleRemove(upload.id)} aria-label={`Remove ${upload.filename}`}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
