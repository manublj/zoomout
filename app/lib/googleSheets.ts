import { TimelineData } from '../types';

export async function getTimelineData(): Promise<TimelineData> {
  try {
    const response = await fetch('/api/sheets');
    
    if (!response.ok) {
      throw new Error('Failed to fetch timeline data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    throw error;
  }
} 