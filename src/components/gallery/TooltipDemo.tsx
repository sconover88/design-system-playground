import { Tooltip, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TooltipDemo() {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Tooltip title="Default tooltip">
        <Button>Hover me</Button>
      </Tooltip>
      <Tooltip title="Top" placement="top">
        <Button variant="outlined">Top</Button>
      </Tooltip>
      <Tooltip title="Right" placement="right">
        <Button variant="outlined">Right</Button>
      </Tooltip>
      <Tooltip title="Bottom" placement="bottom">
        <Button variant="outlined">Bottom</Button>
      </Tooltip>
      <Tooltip title="Left" placement="left">
        <Button variant="outlined">Left</Button>
      </Tooltip>
      <Tooltip title="Delete" arrow>
        <IconButton aria-label="delete"><DeleteIcon /></IconButton>
      </Tooltip>
    </Stack>
  );
}
