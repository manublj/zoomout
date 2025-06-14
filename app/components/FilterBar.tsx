'use client';

import React from 'react';
import { useTimeline } from '../context/TimelineContext';
import { Filter } from '../types';

export default function FilterBar() {
  const { data, activeFilters, toggleFilter } = useTimeline();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3">
          <div className="flex flex-wrap gap-2">
            {data.filters.map((filter: Filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                  activeFilters.some((f) => f.id === filter.id)
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 