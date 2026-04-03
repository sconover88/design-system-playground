import { Box, Typography, Button, Stack, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import PlaygroundList from './PlaygroundList';
import PlaygroundForm from './PlaygroundForm';

export default function CxDashboard() {
  const [tab, setTab] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">CX Dashboard</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowForm(true)}>
          New Playground
        </Button>
      </Stack>

      {showForm ? (
        <PlaygroundForm onClose={() => setShowForm(false)} />
      ) : (
        <>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
            <Tab label="Active" />
            <Tab label="Archived" />
            <Tab label="All" />
          </Tabs>
          <PlaygroundList filter={tab === 0 ? 'active' : tab === 1 ? 'archived' : 'all'} />
        </>
      )}
    </Box>
  );
}
