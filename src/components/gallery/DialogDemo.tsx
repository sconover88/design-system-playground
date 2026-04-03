import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Stack } from '@mui/material';
import { useState } from 'react';

export default function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="demo-dialog-title">
        <DialogTitle id="demo-dialog-title">Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a demo dialog. You can put any content inside, including forms and interactive elements.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Button variant="outlined" onClick={() => setFullOpen(true)}>Full-Width Dialog</Button>
      <Dialog open={fullOpen} onClose={() => setFullOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Full-Width Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>This dialog takes the full width up to the sm breakpoint.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFullOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
