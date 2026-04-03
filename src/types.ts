export interface PlaygroundTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  mode: 'light' | 'dark';
}

export interface SessionUpload {
  id: string;
  filename: string;
  type: 'transcript' | 'video';
  content: string; // extracted text content
  uploadedAt: string;
}

export interface Playground {
  id: string;
  clientName: string;
  brandDescription: string;
  websiteUrl?: string;
  figmaLink?: string;
  notes?: string;
  sessionUploads?: SessionUpload[];
  theme: PlaygroundTheme;
  status: 'active' | 'archived' | 'draft';
  shareId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
  components: GalleryComponentConfig[];
}

export interface GalleryComponentConfig {
  id: string;
  name: string;
  description: string;
}

export interface StyleExtractionResult {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: number;
  mode: 'light' | 'dark';
}
