import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}

export default function TabsDemo() {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={(_, v) => setValue(v)} aria-label="demo tabs">
        <Tab label="Tab One" />
        <Tab label="Tab Two" />
        <Tab label="Tab Three" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Content for Tab One</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Content for Tab Two</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Content for Tab Three</Typography>
      </TabPanel>
    </Box>
  );
}
