import type { StyleExtractionResult } from '../types';

/**
 * Simulated AI style extraction from a website URL.
 * In production, this would call an OpenAI API endpoint to analyze the site.
 */
export async function extractStylesFromUrl(url: string): Promise<StyleExtractionResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Generate pseudo-random styles based on URL hash for consistent demo results
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  }
  const hue = Math.abs(hash % 360);
  const hue2 = (hue + 120) % 360;

  return {
    primaryColor: `hsl(${hue}, 70%, 40%)`,
    secondaryColor: `hsl(${hue2}, 60%, 50%)`,
    fontFamily: ['Roboto, sans-serif', 'Inter, sans-serif', 'Poppins, sans-serif'][Math.abs(hash) % 3],
    borderRadius: [4, 8, 12][Math.abs(hash) % 3],
    mode: 'light',
  };
}

/**
 * Simulated AI style extraction from a Figma link.
 */
export async function extractStylesFromFigma(_figmaLink: string): Promise<StyleExtractionResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    primaryColor: '#6200ea',
    secondaryColor: '#03dac6',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 8,
    mode: 'light',
  };
}
