import React from 'react';
import './TimelinePhaseBar.css';

const TimelinePhaseBar = ({ phases, onPhaseClick, zoomLevel }) => {
  return (
    <div className="timeline-phase-bar">
      {phases.map((phase, index) => (
        <div
          key={phase.id}
          className="phase"
          style={{
            width: `${(phase.end_year - phase.start_year) * zoomLevel}px`,
            backgroundColor: phase.color || '#e9ecef'
          }}
          onClick={() => onPhaseClick(phase)}
        >
          <div className="phase-label">
            [{phase.start_year}–{phase.end_year}]
          </div>
          <div className="phase-tooltip">
            {phase.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelinePhaseBar; 