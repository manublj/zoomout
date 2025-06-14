'use client';

import React from 'react';
import HeaderBar from './HeaderBar';
import FilterBar from './FilterBar';
import TimelineCanvas from './TimelineCanvas';
import LegendBar from './LegendBar';
import PhaseDetailPanel from './PhaseDetailPanel';
import EventDetailPanel from './EventDetailPanel';
import FooterBar from './FooterBar';
import { TimelineProvider } from '../context/TimelineContext';

// Mock data for testing
const mockPhase = {
  id: 'test-phase',
  name: 'Test Phase',
  description: 'This is a test phase',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  color: '#FF5733',
};

const mockEvent = {
  id: 'test-event',
  name: 'Test Event',
  description: 'This is a test event',
  date: new Date().toISOString(),
  title: 'Test Event Title',
  phaseId: 'test-phase',
  type: 'milestone' as const,
  status: 'completed' as const,
};

export default function ComponentTestPage() {
  return (
    <TimelineProvider>
      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold mb-4">Component Test Page</h1>
        
        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">HeaderBar</h2>
          <HeaderBar />
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">FilterBar</h2>
          <FilterBar />
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">TimelineCanvas</h2>
          <div className="h-[300px]">
            <TimelineCanvas />
          </div>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">LegendBar</h2>
          <LegendBar />
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">PhaseDetailPanel</h2>
          <div className="w-[300px]">
            <PhaseDetailPanel phase={mockPhase} />
          </div>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">EventDetailPanel</h2>
          <div className="w-[300px]">
            <EventDetailPanel event={mockEvent} />
          </div>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">FooterBar</h2>
          <FooterBar />
        </section>
      </div>
    </TimelineProvider>
  );
} 