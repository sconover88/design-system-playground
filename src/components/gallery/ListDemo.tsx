import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, ListItemAvatar, Avatar, Divider, Stack, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarIcon from '@mui/icons-material/Star';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';

export default function ListDemo() {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <List sx={{ width: 260, bgcolor: 'background.paper' }} aria-label="basic list">
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1 }}>Basic List</Typography>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><StarIcon /></ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ width: 260, bgcolor: 'background.paper' }} aria-label="avatar list">
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1 }}>Avatar List</Typography>
        <ListItem>
          <ListItemAvatar><Avatar><ImageIcon /></Avatar></ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2024" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar><Avatar><WorkIcon /></Avatar></ListItemAvatar>
          <ListItemText primary="Work" secondary="Feb 12, 2024" />
        </ListItem>
      </List>
    </Stack>
  );
}
