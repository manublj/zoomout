'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimelineContextType, TimelineData, Phase, Event, Filter } from '../types';
import { getTimelineData } from '../lib/googleSheets';

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

export function TimelineProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<TimelineData>({ phases: [], events: [], filters: [] });
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineData = await getTimelineData();
        setData(timelineData);
        setActiveFilters(timelineData.filters.filter(f => f.active));
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => {
      const filter = data.filters.find(f => f.id === filterId);
      if (!filter) return prev;

      if (prev.some(f => f.id === filterId)) {
        return prev.filter(f => f.id !== filterId);
      } else {
        return [...prev, filter];
      }
    });
  };

  const value: TimelineContextType = {
    data,
    selectedPhase,
    selectedEvent,
    setSelectedPhase,
    setSelectedEvent,
    activeFilters,
    toggleFilter,
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
} 