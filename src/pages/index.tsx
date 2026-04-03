import { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemText, Collapse,
  Typography, AppBar, Toolbar, IconButton, useMediaQuery, useTheme, Stack, Paper, Tabs, Tab, Button, Menu, MenuItem, ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { galleryCategories } from '../data/galleryConfig';
import { GalleryDemo } from '../components/gallery';
import ThemeCustomizer from '../components/ThemeCustomizer';
import AIChat from '../components/AIChat';
import ExportPanel from '../components/ExportPanel';
import AccessibilityHints from '../components/AccessibilityHints';
import type { SessionUpload } from '../types';
import { usePlaygroundTheme } from '../context/ThemeContext';
import { exportThemeJSON, downloadThemeFile, downloadFigmaTokens, copyToClipboard } from '../utils/exportUtils';

const DRAWER_WIDTH = 280;
const RIGHT_PANEL_WIDTH = 340;

interface PlaygroundPageProps {
  sessionUploads?: SessionUpload[];
}

export default function PlaygroundPage({ sessionUploads }: PlaygroundPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { playgroundTheme } = usePlaygroundTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({ inputs: true });
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [rightTab, setRightTab] = useState(0);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
  const [snackMsg, setSnackMsg] = useState('');

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sidebarContent = (
    <Box sx={{ overflow: 'auto' }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>Components</Typography>
      <List dense>
        {galleryCategories.map((cat) => (
          <Box key={cat.id}>
            <ListItemButton onClick={() => toggleCategory(cat.id)}>
              <ListItemText primary={cat.label} primaryTypographyProps={{ fontWeight: 600 }} />
              {openCategories[cat.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCategories[cat.id]} timeout="auto" unmountOnExit>
              <List dense disablePadding>
                {cat.components.map((comp) => (
                  <ListItem key={comp.id} disablePadding>
                    <ListItemButton
                      selected={selectedComponent === comp.id}
                      onClick={() => { setSelectedComponent(comp.id); if (isMobile) setMobileOpen(false); }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={comp.name} secondary={comp.description} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );

  const selectedConfig = galleryCategories.flatMap((c) => c.components).find((c) => c.id === selectedComponent);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar for mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Design System Playground</Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', ...(isMobile ? {} : { position: 'relative' }) },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 8 : 0,
          overflow: 'auto',
        }}
      >
        <Stack direction="row" spacing={3} sx={{ height: '100%' }}>
          {/* Component demo area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h4" gutterBottom>{selectedConfig?.name ?? 'Select a component'}</Typography>
            {selectedConfig && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedConfig.description}
              </Typography>
            )}
            <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
              <GalleryDemo componentId={selectedComponent} />
            </Paper>
          </Box>

          {/* Right panel */}
          {!isMobile && (
            <Paper variant="outlined" sx={{ width: RIGHT_PANEL_WIDTH, flexShrink: 0, overflow: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
              <Tabs value={rightTab} onChange={(_, v) => setRightTab(v)} variant="scrollable" scrollButtons="auto">
                <Tab label="Theme" />
                <Tab label="AI Chat" />
                <Tab label="Export" />
                <Tab label="A11y" />
              </Tabs>
              {rightTab === 0 && <ThemeCustomizer />}
              {rightTab === 1 && <AIChat sessionUploads={sessionUploads} />}
              {rightTab === 2 && <ExportPanel />}
              {rightTab === 3 && <AccessibilityHints />}
            </Paper>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
