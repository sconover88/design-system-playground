import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const demos: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  button: lazy(() => import('./ButtonDemo')),
  textfield: lazy(() => import('./TextFieldDemo')),
  checkbox: lazy(() => import('./CheckboxDemo')),
  radio: lazy(() => import('./RadioDemo')),
  switch: lazy(() => import('./SwitchDemo')),
  slider: lazy(() => import('./SliderDemo')),
  select: lazy(() => import('./SelectDemo')),
  appbar: lazy(() => import('./AppBarDemo')),
  tabs: lazy(() => import('./TabsDemo')),
  breadcrumbs: lazy(() => import('./BreadcrumbsDemo')),
  drawer: lazy(() => import('./DrawerDemo')),
  card: lazy(() => import('./CardDemo')),
  accordion: lazy(() => import('./AccordionDemo')),
  paper: lazy(() => import('./PaperDemo')),
  alert: lazy(() => import('./AlertDemo')),
  dialog: lazy(() => import('./DialogDemo')),
  snackbar: lazy(() => import('./SnackbarDemo')),
  progress: lazy(() => import('./ProgressDemo')),
  table: lazy(() => import('./TableDemo')),
  list: lazy(() => import('./ListDemo')),
  chip: lazy(() => import('./ChipDemo')),
  avatar: lazy(() => import('./AvatarDemo')),
  badge: lazy(() => import('./BadgeDemo')),
  tooltip: lazy(() => import('./TooltipDemo')),
  typography: lazy(() => import('./TypographyDemo')),
  grid: lazy(() => import('./GridDemo')),
  stack: lazy(() => import('./StackDemo')),
  divider: lazy(() => import('./DividerDemo')),
};

export function GalleryDemo({ componentId }: { componentId: string }) {
  const Demo = demos[componentId];
  if (!Demo) return <Box sx={{ p: 2, color: 'text.secondary' }}>No demo available for "{componentId}"</Box>;
  return (
    <Suspense fallback={<CircularProgress size={24} />}>
      <Demo />
    </Suspense>
  );
}
