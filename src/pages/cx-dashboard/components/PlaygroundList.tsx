import { Grid, Typography, Box } from '@mui/material';
import PlaygroundCard from './PlaygroundCard';
import { usePlaygrounds } from '../../../services/playgrounds';

interface Props {
  filter: 'active' | 'archived' | 'all';
}

export default function PlaygroundList({ filter }: Props) {
  const { playgrounds, archivePlayground } = usePlaygrounds();

  const filtered = filter === 'all' ? playgrounds : playgrounds.filter((p) => p.status === filter);

  if (filtered.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">No {filter !== 'all' ? filter : ''} playgrounds found.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {filtered.map((pg) => (
        <Grid key={pg.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <PlaygroundCard playground={pg} onArchive={archivePlayground} />
        </Grid>
      ))}
    </Grid>
  );
}
