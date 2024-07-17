// src/api.ts
import axios from 'axios';
import { Transcript, Translation } from './types';

export const fetchTranscript = async (videoId: string): Promise<Transcript[]> => {
  const response = await fetch(`/api/transcripts/${videoId}`);
  const data = await response.json();
  return Array.isArray(data) ? data:[];
};

export const fetchTranslation = async (videoId: string): Promise<Translation[]> => {
  const response = await fetch(`/api/translations/${videoId}`);
  const data = await response.json();
  return Array.isArray(data) ? data:[];
};
