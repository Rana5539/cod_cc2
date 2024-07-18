// src/components/VideoTranslator.tsx
import React, { useEffect, useState, useRef } from 'react';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { fetchTranscript, fetchTranslation } from '../api';
import { Transcript, Translation } from '../types';
import styles from '../styles/VideoTranslator.module.css';

interface VideoTranslatorProps {
  videoId: string;
}

const VideoTranslator: React.FC<VideoTranslatorProps> = ({ videoId }) => {
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [translation, setTranslation] = useState<Translation[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transcriptData = await fetchTranscript(videoId);
        const translationData = await fetchTranslation(videoId);
  
        if (Array.isArray(transcriptData)) {
          setTranscript(transcriptData);
        } else {
          console.error('Transcript data is not an array:', transcriptData);
          setTranscript([]);
        }
  
        if (Array.isArray(translationData)) {
          setTranslation(translationData);
        } else {
          console.error('Translation data is not an array:', translationData);
          setTranslation([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTranscript([]);
        setTranslation([]);
      }
    };
  
    fetchData();
  }, [videoId]);
  
  

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playerRef.current) {
      interval = setInterval(() => {
        const currentTime = playerRef.current?.getCurrentTime();
        if (currentTime !== undefined) {
          setCurrentTime(currentTime);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [playerRef.current]);

  const handlePlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    
    <div className={styles.container}>
      
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handlePlayerReady}
      />
      <div className={styles.transcript}>
        {transcript.map((item, index) => (
          <p style={{color:'black'}}
            key={index}
            className={
              currentTime >= item.start && currentTime <= item.start + item.duration
                ? styles.highlight
                : ''
            }
          >
            {item.text}
          </p>
        ))}
      </div>
      <div className={styles.translation}>
        {translation.map((item, index) => (
          <p key={index} style={{color:'black'}}>{item.text}</p>
        ))}
      </div>
    </div>
  );
};

export default VideoTranslator;
