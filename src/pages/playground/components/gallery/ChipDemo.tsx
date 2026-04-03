import { Chip, Stack, Avatar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

export default function ChipDemo() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Secondary" color="secondary" />
        <Chip label="Success" color="success" />
        <Chip label="Error" color="error" />
        <Chip label="Warning" color="warning" />
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip label="Outlined" variant="outlined" />
        <Chip label="Outlined Primary" variant="outlined" color="primary" />
        <Chip label="Clickable" clickable />
        <Chip label="Deletable" onDelete={() => {}} />
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Chip avatar={<Avatar>M</Avatar>} label="Avatar Chip" />
        <Chip icon={<FaceIcon />} label="Icon Chip" color="primary" />
        <Chip label="Small" size="small" />
        <Chip label="Disabled" disabled />
      </Stack>
    </Stack>
  );
}
