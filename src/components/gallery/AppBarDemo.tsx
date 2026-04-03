import { AppBar, Toolbar, Typography, Button, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppBarDemo() {
  return (
    <Stack spacing={2}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            App Bar
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dense Secondary
          </Typography>
          <Button color="inherit">Action</Button>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
