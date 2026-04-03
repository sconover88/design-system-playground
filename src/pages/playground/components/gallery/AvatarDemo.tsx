import { Avatar, AvatarGroup, Stack, Typography } from '@mui/material';

export default function AvatarDemo() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
        <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>Sizes:</Typography>
        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
        <Avatar>M</Avatar>
        <Avatar sx={{ width: 56, height: 56 }}>L</Avatar>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>Group:</Typography>
        <AvatarGroup max={4}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
          <Avatar sx={{ bgcolor: 'success.main' }}>C</Avatar>
          <Avatar sx={{ bgcolor: 'error.main' }}>D</Avatar>
          <Avatar sx={{ bgcolor: 'warning.main' }}>E</Avatar>
        </AvatarGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Avatar variant="square" sx={{ bgcolor: 'primary.main' }}>Sq</Avatar>
        <Avatar variant="rounded" sx={{ bgcolor: 'secondary.main' }}>Rd</Avatar>
      </Stack>
    </Stack>
  );
}
