import { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, IconButton, Paper, Typography, Stack, CircularProgress, Fab, Badge, Collapse,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Minimize';
import type { ChatMessage, SessionUpload } from '../types';
import { usePlaygroundTheme } from '../context/ThemeContext';
import { v4 as uuidv4 } from 'uuid';

function buildSessionSummary(uploads: SessionUpload[]): string {
  if (uploads.length === 0) return '';
  const transcriptUploads = uploads.filter((u) => u.type === 'transcript');
  if (transcriptUploads.length === 0) return '';
  // Combine all transcript text, truncated to reasonable length for context
  const combined = transcriptUploads.map((u) => u.content).join('\n---\n');
  return combined.length > 10000 ? combined.slice(0, 10000) + '\n[...truncated]' : combined;
}

const SYSTEM_WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi! I can help you customize your theme. Try asking me things like:\n• "Suggest a warm color palette for a food brand"\n• "Make the theme more accessible"\n• "Switch to a modern sans-serif font"\n• "Create a dark corporate theme"\n• "What did the client say about colors?"',
  timestamp: new Date().toISOString(),
};

const SYSTEM_WELCOME_WITH_CONTEXT: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi! I have access to session transcripts/recordings from this client. I can help you:\n• Customize theme based on client feedback\n• "What colors did the client mention?"\n• "Summarize the client\'s design preferences"\n• "What fonts did they like?"\n• Plus all the usual theme suggestions!',
  timestamp: new Date().toISOString(),
};

function generateAIResponse(userMessage: string, currentTheme: Record<string, unknown>, sessionContext: string): string {
  const lower = userMessage.toLowerCase();

  // If there's session context and the user is asking about it
  if (sessionContext) {
    const contextLower = sessionContext.toLowerCase();

    if (lower.includes('summary') || lower.includes('summarize') || lower.includes('overview')) {
      const lines = sessionContext.split('\n').filter(Boolean);
      const preview = lines.slice(0, 15).join('\n');
      return `Based on the session transcript (${lines.length} lines), here\'s what I found:\n\n${preview}\n\n${lines.length > 15 ? `...and ${lines.length - 15} more lines. Ask me about specific topics like colors, fonts, or preferences!` : 'That covers the full transcript. Ask me about specific design preferences mentioned!'}`;
    }

    if (lower.includes('color') || lower.includes('palette') || lower.includes('colour')) {
      // Search transcript for color-related mentions
      const colorKeywords = ['color', 'colour', 'blue', 'red', 'green', 'purple', 'orange', 'yellow', 'pink', 'teal', 'navy', 'brand', 'palette', 'hex', '#'];
      const relevantLines = sessionContext.split('\n').filter((line) =>
        colorKeywords.some((kw) => line.toLowerCase().includes(kw))
      );
      if (relevantLines.length > 0) {
        return `From the session transcript, I found these color-related mentions:\n\n${relevantLines.slice(0, 10).map((l) => `• "${l.trim()}"`).join('\n')}\n\nBased on this, I can suggest a palette. Would you like me to recommend specific hex values?`;
      }
      return 'I didn\'t find specific color mentions in the session transcript. ' + generateFallbackColorResponse();
    }

    if (lower.includes('font') || lower.includes('type') || lower.includes('typography')) {
      const fontKeywords = ['font', 'type', 'typography', 'serif', 'sans', 'bold', 'italic', 'heading', 'text', 'readable', 'clean', 'modern'];
      const relevantLines = sessionContext.split('\n').filter((line) =>
        fontKeywords.some((kw) => line.toLowerCase().includes(kw))
      );
      if (relevantLines.length > 0) {
        return `From the session transcript, I found these typography-related mentions:\n\n${relevantLines.slice(0, 8).map((l) => `• "${l.trim()}"`).join('\n')}\n\nWould you like me to suggest specific fonts based on this feedback?`;
      }
      return 'I didn\'t find specific font preferences in the session. Here are general suggestions:\n• **Roboto** — Clean and neutral\n• **Inter** — Excellent for UI\n• **Poppins** — Modern geometric feel\n\nYou can change fonts in the Theme Customizer panel.';
    }

    if (lower.includes('client') || lower.includes('said') || lower.includes('mention') || lower.includes('want') || lower.includes('prefer') || lower.includes('like')) {
      // General query about client preferences — search for preference signals
      const prefKeywords = ['want', 'like', 'prefer', 'love', 'hate', 'need', 'feel', 'look', 'style', 'brand', 'clean', 'modern', 'professional', 'friendly', 'warm', 'cool'];
      const relevantLines = sessionContext.split('\n').filter((line) =>
        prefKeywords.some((kw) => line.toLowerCase().includes(kw))
      );
      if (relevantLines.length > 0) {
        return `Here\'s what the client expressed in the session:\n\n${relevantLines.slice(0, 12).map((l) => `• "${l.trim()}"`).join('\n')}\n\nWould you like me to translate these preferences into theme settings?`;
      }
      return 'I have the session transcript loaded but couldn\'t find specific preference statements. Try asking about specific topics like colors, fonts, or overall vibe.';
    }

    // Check if any part of the user's question matches content in the transcript
    const userWords = lower.split(/\s+/).filter((w) => w.length > 3);
    const matchingLines = sessionContext.split('\n').filter((line) =>
      userWords.some((w) => line.toLowerCase().includes(w))
    );
    if (matchingLines.length > 0 && matchingLines.length < 20) {
      return `From the session transcript, here are relevant mentions:\n\n${matchingLines.slice(0, 8).map((l) => `• "${l.trim()}"`).join('\n')}\n\n${contextLower ? 'Would you like me to suggest theme changes based on this?' : ''}`;
    }
  }

  if (lower.includes('dark') && (lower.includes('theme') || lower.includes('mode'))) {
    return `I'd suggest switching to dark mode. You can toggle it in the Theme Customizer panel. Dark themes work well with lighter primary colors like #90caf9 or #80cbc4 for good contrast.\n\nCurrent theme: ${JSON.stringify(currentTheme, null, 2)}`;
  }
  if (lower.includes('accessible') || lower.includes('accessibility') || lower.includes('wcag')) {
    return 'For better accessibility:\n• Ensure a contrast ratio of at least 4.5:1 for normal text\n• Use a minimum font size of 16px for body text\n• Avoid relying solely on color to convey information\n• Test with screen readers\n• Use semantic HTML elements\n\nI recommend checking your current colors against WCAG guidelines.';
  }
  if (lower.includes('warm') || lower.includes('food') || lower.includes('restaurant')) {
    return 'For a warm food-brand palette, try:\n• Primary: #e65100 (deep orange)\n• Secondary: #ff8f00 (amber)\n• Font: Poppins or Lato\n• Border radius: 12px for a friendly feel\n\nYou can apply these in the Theme Customizer panel.';
  }
  if (lower.includes('corporate') || lower.includes('professional') || lower.includes('business')) {
    return 'For a corporate look:\n• Primary: #1565c0 (dark blue)\n• Secondary: #37474f (blue-gray)\n• Font: Inter or Roboto\n• Border radius: 4px for crisp edges\n• Light mode for professionalism';
  }
  if (lower.includes('modern') || lower.includes('minimal')) {
    return 'For a modern minimalist design:\n• Primary: #000000 or #212121\n• Secondary: #757575\n• Font: Inter or Montserrat\n• Border radius: 8-12px\n• Consider dark mode for a sleek feel';
  }
  if (lower.includes('font') || lower.includes('typography')) {
    return 'Here are some font suggestions:\n• **Roboto** — Google\'s go-to, clean and neutral\n• **Inter** — Excellent for UI, great readability\n• **Poppins** — Geometric, modern feel\n• **Playfair Display** — Elegant serif for luxury brands\n• **Montserrat** — Clean geometric sans-serif\n\nYou can change the font in the Theme Customizer panel.';
  }
  if (lower.includes('color') || lower.includes('palette')) {
    return 'Some popular color palettes:\n• **Ocean**: Primary #0277bd, Secondary #00838f\n• **Forest**: Primary #2e7d32, Secondary #558b2f\n• **Sunset**: Primary #e65100, Secondary #f57f17\n• **Royal**: Primary #4a148c, Secondary #880e4f\n\nPick one and I can guide you through applying it!';
  }

  return `Thanks for your input! Here are some things I can help with:\n• Color palette suggestions based on your brand\n• Typography recommendations\n• Accessibility improvements\n• Theme mode (light/dark) advice${sessionContext ? '\n• Questions about the session transcript' : ''}\n\nTry describing your brand or the mood you\'re going for!`;
}

function generateFallbackColorResponse(): string {
  return 'Some popular color palettes:\n• **Ocean**: Primary #0277bd, Secondary #00838f\n• **Forest**: Primary #2e7d32, Secondary #558b2f\n• **Sunset**: Primary #e65100, Secondary #f57f17\n• **Royal**: Primary #4a148c, Secondary #880e4f\n\nPick one and I can guide you through applying it!';
}

interface AIChatProps {
  sessionUploads?: SessionUpload[];
}

export default function AIChat({ sessionUploads = [] }: AIChatProps) {
  const sessionContext = buildSessionSummary(sessionUploads);
  const hasContext = sessionContext.length > 0;
  const [messages, setMessages] = useState<ChatMessage[]>([hasContext ? SYSTEM_WELCOME_WITH_CONTEXT : SYSTEM_WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playgroundTheme } = usePlaygroundTheme();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(text, playgroundTheme as unknown as Record<string, unknown>, sessionContext);
      const aiMsg: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
      if (!open) setUnread((n) => n + 1);
    }, 800);
  };

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
      {/* Floating chat window */}
      <Collapse in={open} unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            width: 380,
            height: 520,
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            mb: 1.5,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <SmartToyIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>AI Theme Assistant</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'inherit' }} aria-label="Minimize chat">
                <MinimizeIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'inherit' }} aria-label="Close chat">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1.5 }}>
            {messages.map((msg) => (
              <Stack
                key={msg.id}
                direction="row"
                spacing={1}
                sx={{ mb: 1.5, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {msg.role === 'assistant' && <SmartToyIcon color="primary" sx={{ mt: 0.5, fontSize: 20 }} />}
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '80%',
                    bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                    color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                    whiteSpace: 'pre-wrap',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: 13 }}>{msg.content}</Typography>
                </Paper>
                {msg.role === 'user' && <PersonIcon color="action" sx={{ mt: 0.5, fontSize: 20 }} />}
              </Stack>
            ))}
            {loading && (
              <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                <SmartToyIcon color="primary" sx={{ mt: 0.5, fontSize: 20 }} />
                <Paper sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <CircularProgress size={16} />
                </Paper>
              </Stack>
            )}
            <div ref={bottomRef} />
          </Box>

          {/* Input */}
          <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask about themes, colors, accessibility..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                aria-label="Chat message input"
              />
              <IconButton color="primary" onClick={handleSend} disabled={loading || !input.trim()} aria-label="Send message">
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      </Collapse>

      {/* FAB toggle */}
      {!open && (
        <Fab color="primary" onClick={handleOpen} aria-label="Open AI chat" sx={{ boxShadow: 6 }}>
          <Badge badgeContent={unread} color="error">
            <ChatIcon />
          </Badge>
        </Fab>
      )}
    </Box>
  );
}
