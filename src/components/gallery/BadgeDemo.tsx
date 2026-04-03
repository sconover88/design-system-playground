import { Badge, Stack, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BadgeDemo() {
  return (
    <Stack direction="row" spacing={3}>
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={10} color="secondary">
        <ShoppingCartIcon />
      </Badge>
      <Badge badgeContent={100} max={99} color="error">
        <NotificationsIcon />
      </Badge>
      <Badge variant="dot" color="primary">
        <MailIcon />
      </Badge>
      <IconButton aria-label="notifications">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Badge badgeContent={0} showZero color="primary">
        <MailIcon />
      </Badge>
    </Stack>
  );
}
