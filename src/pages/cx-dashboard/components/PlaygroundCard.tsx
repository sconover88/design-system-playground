import { Card, CardContent, CardActions, Typography, Button, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import type { Playground } from '../../../types';

interface Props {
  playground: Playground;
  onArchive: (id: string) => void;
}

export default function PlaygroundCard({ playground, onArchive }: Props) {
  const shareUrl = `${window.location.origin}/${playground.shareId}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{playground.clientName}</Typography>
          <Chip
            label={playground.status}
            size="small"
            color={playground.status === 'active' ? 'success' : playground.status === 'draft' ? 'warning' : 'default'}
          />
        </Stack>
        {playground.brandDescription && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {playground.brandDescription}
          </Typography>
        )}
        {playground.websiteUrl && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Website: {playground.websiteUrl}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
          Created: {new Date(playground.createdAt).toLocaleDateString()}
        </Typography>
        {playground.notes && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Notes: {playground.notes}
          </Typography>
        )}
        {playground.sessionUploads && playground.sessionUploads.length > 0 && (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
            <DescriptionIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {playground.sessionUploads.length} session {playground.sessionUploads.length === 1 ? 'file' : 'files'} uploaded
            </Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" href={`/${playground.shareId}`} startIcon={<OpenInNewIcon />}>
          Open
        </Button>
        <Tooltip title="Copy share link">
          <IconButton size="small" onClick={handleCopyLink} aria-label="Copy share link">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {playground.status !== 'archived' && (
          <Tooltip title="Archive playground">
            <IconButton size="small" onClick={() => onArchive(playground.id)} aria-label="Archive playground">
              <ArchiveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
