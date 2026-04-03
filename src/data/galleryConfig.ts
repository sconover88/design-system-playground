import type { GalleryCategory } from '../types';

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'inputs',
    label: 'Inputs',
    components: [
      { id: 'button', name: 'Button', description: 'Buttons for actions and form submission' },
      { id: 'textfield', name: 'TextField', description: 'Text input fields' },
      { id: 'checkbox', name: 'Checkbox', description: 'Checkboxes for multiple selections' },
      { id: 'radio', name: 'Radio', description: 'Radio buttons for single selection' },
      { id: 'switch', name: 'Switch', description: 'Toggle switches' },
      { id: 'slider', name: 'Slider', description: 'Slider controls for ranges' },
      { id: 'select', name: 'Select', description: 'Dropdown select menus' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    components: [
      { id: 'appbar', name: 'AppBar', description: 'Top application bar' },
      { id: 'tabs', name: 'Tabs', description: 'Tab navigation' },
      { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Breadcrumb navigation' },
      { id: 'drawer', name: 'Drawer', description: 'Side navigation drawer' },
    ],
  },
  {
    id: 'surfaces',
    label: 'Surfaces',
    components: [
      { id: 'card', name: 'Card', description: 'Content cards' },
      { id: 'accordion', name: 'Accordion', description: 'Expandable accordion panels' },
      { id: 'paper', name: 'Paper', description: 'Paper surface component' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    components: [
      { id: 'alert', name: 'Alert', description: 'Alert messages' },
      { id: 'dialog', name: 'Dialog', description: 'Modal dialogs' },
      { id: 'snackbar', name: 'Snackbar', description: 'Brief notification messages' },
      { id: 'progress', name: 'Progress', description: 'Progress indicators' },
    ],
  },
  {
    id: 'data-display',
    label: 'Data Display',
    components: [
      { id: 'table', name: 'Table', description: 'Data tables' },
      { id: 'list', name: 'List', description: 'Lists and list items' },
      { id: 'chip', name: 'Chip', description: 'Compact element chips' },
      { id: 'avatar', name: 'Avatar', description: 'User avatar components' },
      { id: 'badge', name: 'Badge', description: 'Badge indicators' },
      { id: 'tooltip', name: 'Tooltip', description: 'Tooltip popovers' },
      { id: 'typography', name: 'Typography', description: 'Text typography styles' },
    ],
  },
  {
    id: 'layout',
    label: 'Layout',
    components: [
      { id: 'grid', name: 'Grid', description: 'Grid layout system' },
      { id: 'stack', name: 'Stack', description: 'Stack layout' },
      { id: 'divider', name: 'Divider', description: 'Content dividers' },
    ],
  },
];
