// src/pages/index.tsx
import React from 'react';
import { useRouter } from 'next/router';
import VideoTranslator from '../components/VideoTranslator';

const Home: React.FC = () => {
  const router = useRouter();
  const { videoId } = router.query;

  if (!videoId || typeof videoId !== 'string') {
    return <div>Please provide a videoId as a query parameter.</div>;
  }

  return <VideoTranslator videoId={videoId} />;
};

export default Home;
