import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Playground, PlaygroundTheme } from '../types';

const STORAGE_KEY = 'ds-playgrounds';

function loadPlaygrounds(): Playground[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePlaygrounds(playgrounds: Playground[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playgrounds));
}

interface CreatePayload {
  clientName: string;
  brandDescription: string;
  websiteUrl?: string;
  figmaLink?: string;
  notes?: string;
  sessionUploads?: Playground['sessionUploads'];
  theme: PlaygroundTheme;
  status: Playground['status'];
}

export function usePlaygrounds() {
  const [playgrounds, setPlaygrounds] = useState<Playground[]>(loadPlaygrounds);

  const createPlayground = useCallback((payload: CreatePayload): Playground => {
    const now = new Date().toISOString();
    const pg: Playground = {
      id: uuidv4(),
      shareId: uuidv4().slice(0, 8),
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
    setPlaygrounds((prev) => {
      const next = [pg, ...prev];
      savePlaygrounds(next);
      return next;
    });
    return pg;
  }, []);

  const archivePlayground = useCallback((id: string) => {
    setPlaygrounds((prev) => {
      const next = prev.map((pg) =>
        pg.id === id ? { ...pg, status: 'archived' as const, updatedAt: new Date().toISOString() } : pg,
      );
      savePlaygrounds(next);
      return next;
    });
  }, []);

  const updatePlayground = useCallback((id: string, updates: Partial<Omit<Playground, 'id' | 'shareId' | 'createdAt'>>) => {
    setPlaygrounds((prev) => {
      const next = prev.map((pg) =>
        pg.id === id ? { ...pg, ...updates, updatedAt: new Date().toISOString() } : pg,
      );
      savePlaygrounds(next);
      return next;
    });
  }, []);

  const getPlaygroundByShareId = useCallback((shareId: string): Playground | undefined => {
    return loadPlaygrounds().find((pg) => pg.shareId === shareId);
  }, []);

  return { playgrounds, createPlayground, archivePlayground, updatePlayground, getPlaygroundByShareId };
}
