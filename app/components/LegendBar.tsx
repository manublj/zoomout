'use client';

import React from 'react';
import { useTimeline } from '../context/TimelineContext';

export default function LegendBar() {
  const { data } = useTimeline();

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">Legend:</span>
            {data.phases.map((phase) => (
              <div key={phase.id} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: phase.color }}
                />
                <span className="text-sm text-gray-700">{phase.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 