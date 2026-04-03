import { useState, useEffect } from 'react';
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
import { galleryCategories } from '../../config/galleryConfig';
import { GalleryDemo } from './components/gallery';
import ThemeCustomizer from '../../components/ThemeCustomizer';
import AIChat from '../../components/AIChat';
import AccessibilityHints from '../../components/AccessibilityHints';
import type { SessionUpload } from '../../types';
import { usePlaygroundTheme } from '../../providers/ThemeProvider';
import { exportThemeJSON, downloadThemeFile, downloadFigmaTokens, copyToClipboard } from '../../lib/exportUtils';

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

  useEffect(() => {
    if (snackMsg) {
      const t = setTimeout(() => setSnackMsg(''), 2000);
      return () => clearTimeout(t);
    }
  }, [snackMsg]);

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>Design System Playground</Typography>
          <Button
            color="inherit"
            startIcon={<FileDownloadIcon />}
            onClick={(e) => setExportAnchor(e.currentTarget)}
            aria-label="Export menu"
          >
            Export
          </Button>
          <Menu
            anchorEl={exportAnchor}
            open={Boolean(exportAnchor)}
            onClose={() => setExportAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={async () => { await copyToClipboard(exportThemeJSON(playgroundTheme)); setExportAnchor(null); setSnackMsg('Theme JSON copied!'); }}>
              <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
              Copy Theme JSON
            </MenuItem>
            <MenuItem onClick={async () => {
              const code = `import { createTheme } from '@mui/material/styles';\n\nconst theme = createTheme(${exportThemeJSON(playgroundTheme)});\n\nexport default theme;`;
              await copyToClipboard(code); setExportAnchor(null); setSnackMsg('MUI code copied!');
            }}>
              <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
              Copy MUI Theme Code
            </MenuItem>
            <MenuItem onClick={() => { downloadThemeFile(playgroundTheme); setExportAnchor(null); setSnackMsg('Theme file downloaded!'); }}>
              <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
              Download Theme JSON
            </MenuItem>
            <MenuItem onClick={() => { downloadFigmaTokens(playgroundTheme); setExportAnchor(null); setSnackMsg('Figma tokens downloaded!'); }}>
              <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
              Download Figma Tokens
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Snackbar for export feedback */}
      {snackMsg && (
        <Box
          sx={{
            position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', zIndex: 1400,
            bgcolor: 'success.main', color: 'success.contrastText', px: 3, py: 1, borderRadius: 2, boxShadow: 3,
          }}
        >
          <Typography variant="body2">{snackMsg}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, mt: '64px' }}>
        {/* Sidebar */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              top: 64,
              height: 'calc(100% - 64px)',
              ...(isMobile ? { top: 0, height: '100%' } : {}),
            },
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

            {/* Right panel — Theme & A11y only */}
            {!isMobile && (
              <Paper variant="outlined" sx={{ width: RIGHT_PANEL_WIDTH, flexShrink: 0, overflow: 'auto', maxHeight: 'calc(100vh - 112px)' }}>
                <Tabs value={rightTab} onChange={(_, v) => setRightTab(v)}>
                  <Tab label="Theme" />
                  <Tab label="A11y" />
                </Tabs>
                {rightTab === 0 && <ThemeCustomizer />}
                {rightTab === 1 && <AccessibilityHints />}
              </Paper>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Floating AI Chat */}
      <AIChat sessionUploads={sessionUploads} />
    </Box>
  );
}
