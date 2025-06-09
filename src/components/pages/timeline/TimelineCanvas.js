import React from 'react';
import './TimelineCanvas.css';

const TimelineCanvas = ({ 
  children, 
  zoomLevel, 
  onZoomChange,
  startYear,
  endYear
}) => {
  // Add console.log to debug props
  console.log('TimelineCanvas props:', { 
    childrenCount: React.Children.count(children),
    zoomLevel,
    startYear,
    endYear
  });

  // Determine zoom level class
  const getZoomLevelClass = (level) => {
    switch(level) {
      case 'year': return 'zoom-level-year';
      case 'decade': return 'zoom-level-decade';
      case 'phase': return 'zoom-level-phase';
      default: return 'zoom-level-phase';
    }
  };

  return (
    <div className={`timeline-canvas ${getZoomLevelClass(zoomLevel)}`}>
      {/* Time Range Header */}
      <div className="timeline-range">
        <span className="year">{startYear}</span>
        <div className="range-line"></div>
        <span className="year">{endYear}</span>
      </div>

      {/* Timeline Content */}
      <div className="timeline-content">
        {React.Children.count(children) > 0 ? (
          React.Children.map(children, (child, index) => (
            <div key={index} className="timeline-row-wrapper">
              {child}
            </div>
          ))
        ) : (
          <div className="no-timelines">No timelines available</div>
        )}
      </div>

      {/* Timeline Controls */}
      <div className="timeline-controls">
        <div className="zoom-control">
          <span>Timeline Zoom:</span>
          <select 
            value={zoomLevel} 
            onChange={(e) => onZoomChange(e.target.value)}
            className="zoom-select"
          >
            <option value="year">Year View</option>
            <option value="decade">Decade View</option>
            <option value="phase">Phase View</option>
          </select>
        </div>
        <div className="scroll-indicator">
          ← Scroll Horizontally →
        </div>
      </div>
    </div>
  );
};

export default TimelineCanvas; 