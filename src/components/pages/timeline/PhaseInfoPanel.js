import React from 'react';
import './PhaseInfoPanel.css';

const PhaseInfoPanel = ({ phase, onClose }) => {
  return (
    <div className="phase-info-panel">
      <div className="phase-header">
        <h3>Phase: [{phase.start_year}–{phase.end_year}] — {phase.title}</h3>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>

      <div className="phase-content">
        <div className="phase-summary">
          <h4>Summary:</h4>
          <p>{phase.summary}</p>
        </div>

        <div className="phase-events">
          <h4>🔹 Events:</h4>
          <ul>
            {phase.events?.map(event => (
              <li key={event.id}>
                {event.year}: {event.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="phase-issues">
          <h4>🔹 Issues:</h4>
          <ul>
            {phase.issues?.map(issue => (
              <li key={issue.id}>{issue.title}</li>
            ))}
          </ul>
        </div>

        <div className="phase-structures">
          <h4>🔹 Linked Structures:</h4>
          <ul>
            {phase.structures?.map(structure => (
              <li key={structure.id}>
                {structure.title} ({structure.type})
              </li>
            ))}
          </ul>
        </div>

        <div className="phase-struggles">
          <h4>🔹 Linked Struggles:</h4>
          <ul>
            {phase.struggles?.map(struggle => (
              <li key={struggle.id}>{struggle.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhaseInfoPanel; 