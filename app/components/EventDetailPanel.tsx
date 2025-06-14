'use client';

import React from 'react';
import { Event } from '../types';
import { useTimeline } from '../context/TimelineContext';

interface EventDetailPanelProps {
  event: Event;
}

export default function EventDetailPanel({ event }: EventDetailPanelProps) {
  const { setSelectedEvent, data } = useTimeline();
  const phase = data.phases.find((p) => p.id === event.phaseId);

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-medium text-gray-900">{event.title}</h2>
          <button
            type="button"
            onClick={() => setSelectedEvent(null)}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          {event.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-sm text-gray-900">{event.description}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phase</h3>
            <div className="mt-1 flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: phase?.color }}
              />
              <span className="text-sm text-gray-900">{phase?.name}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Type</h3>
            <p className="mt-1 text-sm text-gray-900 capitalize">{event.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 text-sm text-gray-900 capitalize">{event.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 