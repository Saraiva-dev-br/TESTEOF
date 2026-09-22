import { useState } from 'react';
import { OPPORTUNITIES, HIRED_STUDENTS, VIDEO_STORIES } from '../data/siteData';
import { Opportunity, Hire, VideoStory } from '../types';

interface LivePublicData {
  opportunities: Opportunity[];
  hires: Hire[];
  stories: VideoStory[];
  isLoading: boolean;
  isLive: boolean;
}

export function useLiveSiteData(): LivePublicData {
  const [opportunities] = useState<Opportunity[]>(OPPORTUNITIES);
  const [hires] = useState<Hire[]>(HIRED_STUDENTS);
  const [stories] = useState<VideoStory[]>(VIDEO_STORIES);

  // Instantly ready without network stalls or blocking timeouts
  return { 
    opportunities, 
    hires, 
    stories, 
    isLoading: false, 
    isLive: true 
  };
}

