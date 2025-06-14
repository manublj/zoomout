'use client';

import React from 'react';
import { TimelineProvider } from './context/TimelineContext';
import TimelinePage from './components/TimelinePage';

export default function Home() {
  return (
    <TimelineProvider>
      <main className="min-h-screen bg-gray-100">
        <TimelinePage />
      </main>
    </TimelineProvider>
  );
} 