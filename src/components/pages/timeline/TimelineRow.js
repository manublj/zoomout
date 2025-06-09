import React from 'react';
import TimelinePhaseBar from './TimelinePhaseBar';
import './TimelineRow.css';

const TimelineRow = ({ 
  timeline, 
  onEventClick, 
  onPhaseClick, 
  onSelect,
  zoomLevel,
  isSelected 
}) => {
  // Add console.log to debug props
  console.log('TimelineRow props:', { timeline, zoomLevel, isSelected });

  const { 
    title, 
    category, 
    linked_phases = [], 
    event_ids = [], 
    timeline_type,
    start_year,
    end_year
  } = timeline || {};

  // Add error boundary
  if (!timeline) {
    console.error('TimelineRow: No timeline data provided');
    return null;
  }

  return (
    <div 
      className={`timeline-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(timeline)}
    >
      {/* Timeline Label */}
      <div className="timeline-label">
        <h3 className="timeline-title">{title}</h3>
        <span className="timeline-category">{category}</span>
      </div>

      {/* Timeline Track */}
      <div className="timeline-track">
        {/* Phase Bar */}
        <TimelinePhaseBar 
          phases={linked_phases}
          onPhaseClick={onPhaseClick}
          zoomLevel={zoomLevel}
        />

        {/* Events */}
        <div className="timeline-events">
          {event_ids.map(eventId => (
            <div 
              key={eventId}
              className="event-dot"
              onClick={(e) => {
                e.stopPropagation();
                onEventClick({ id: eventId });
              }}
              title={`Event ${eventId}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineRow; 