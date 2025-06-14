'use client';

import React from 'react';
import HeaderBar from './HeaderBar';
import FilterBar from './FilterBar';
import TimelineCanvas from './TimelineCanvas';
import LegendBar from './LegendBar';
import PhaseDetailPanel from './PhaseDetailPanel';
import EventDetailPanel from './EventDetailPanel';
import FooterBar from './FooterBar';
import { useTimeline } from '../context/TimelineContext';

export default function TimelinePage() {
  const { selectedPhase, selectedEvent } = useTimeline();

  return (
    <div className="flex flex-col h-screen">
      <HeaderBar />
      <FilterBar />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <TimelineCanvas />
          <LegendBar />
        </div>
        {selectedPhase && <PhaseDetailPanel phase={selectedPhase} />}
        {selectedEvent && <EventDetailPanel event={selectedEvent} />}
      </div>
      <FooterBar />
    </div>
  );
} 