import { useParams } from 'react-router-dom';
import { usePlaygrounds } from '../api/playgrounds';
import PlaygroundPage from './index';
import { Box, Typography, Button } from '@mui/material';

export default function SharedPlayground() {
  const { shareId } = useParams<{ shareId: string }>();
  const { getPlaygroundByShareId } = usePlaygrounds();

  const playground = shareId ? getPlaygroundByShareId(shareId) : undefined;

  if (!playground) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
        <Typography variant="h4">Playground Not Found</Typography>
        <Typography color="text.secondary">The playground you're looking for doesn't exist or has been removed.</Typography>
        <Button variant="contained" href="/">Go to Main Playground</Button>
      </Box>
    );
  }

  // Load the playground with the saved theme and session context
  return <PlaygroundPage sessionUploads={playground.sessionUploads} />;
}
