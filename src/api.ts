// src/api.ts
import axios from 'axios';
import { Transcript, Translation } from './types';

export const fetchTranscript = async (videoId: string): Promise<Transcript[]> => {
  const response = await fetch(`/api/transcripts/${videoId}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });
  return response.json();
};

export const fetchTranslation = async (videoId: string): Promise<Translation[]> => {
  const response = await fetch(`/api/translations/${videoId}`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
  });
  return response.json();
};
