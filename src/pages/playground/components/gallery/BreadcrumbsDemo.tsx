import { Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function BreadcrumbsDemo() {
  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">Home</Link>
        <Link underline="hover" color="inherit" href="#">Catalog</Link>
        <Typography color="text.primary">Current Page</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="custom breadcrumb">
        <Link underline="hover" color="inherit" href="#">Dashboard</Link>
        <Link underline="hover" color="inherit" href="#">Settings</Link>
        <Typography color="text.primary">Profile</Typography>
      </Breadcrumbs>
    </Stack>
  );
}
