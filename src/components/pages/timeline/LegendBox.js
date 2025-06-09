import React from 'react';
import './LegendBox.css';

const LegendBox = () => {
  const legendItems = [
    { label: 'Historical Arc', color: 'var(--primary)', description: 'Major historical periods' },
    { label: 'Thematic Sequence', color: 'var(--secondary)', description: 'Thematic developments' },
    { label: 'Struggle Timeline', color: 'var(--accent)', description: 'Social movement timelines' },
    { label: 'Active Phase', color: 'var(--success)', description: 'Currently active phases' },
    { label: 'Closed Phase', color: 'var(--muted)', description: 'Completed phases' },
    { label: 'High Rupture', color: 'var(--destructive)', description: 'Periods of major change' }
  ];

  return (
    <div className="legend-box">
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          <div className="legend-color-wrapper">
            <span 
              className="legend-color" 
              style={{ backgroundColor: item.color }}
            />
          </div>
          <div className="legend-text">
            <span className="legend-label">{item.label}</span>
            <span className="legend-description">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegendBox; 