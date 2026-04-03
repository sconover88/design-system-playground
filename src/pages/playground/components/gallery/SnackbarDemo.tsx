import { Snackbar, Button, Alert, Stack } from '@mui/material';
import { useState } from 'react';

export default function SnackbarDemo() {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => setOpen(true)}>Show Snackbar</Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message="This is a snackbar message" />

      <Button variant="outlined" onClick={() => setAlertOpen(true)}>Show Alert Snackbar</Button>
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Operation completed successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
