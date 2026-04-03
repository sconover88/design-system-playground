import { Alert, AlertTitle, Stack } from '@mui/material';

export default function AlertDemo() {
  return (
    <Stack spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — check it out!
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert — be careful!
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — good to know!
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — well done!
      </Alert>
      <Alert variant="outlined" severity="info">Outlined info alert</Alert>
      <Alert variant="filled" severity="success">Filled success alert</Alert>
    </Stack>
  );
}
