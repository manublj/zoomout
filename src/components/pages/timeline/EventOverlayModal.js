import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EventOverlayModal.css';

const EventOverlayModal = ({ event, structures, contradictions, struggles, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event.title}</h2>
          <button className="btn btn-icon" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="event-meta">
            <p className="multi-headline">{event.multi_headline}</p>
            <div className="meta-grid">
              <div>Date: {event.date}</div>
              <div>Reporting Date: {event.reporting_date}</div>
              <div>Location: {event.location}</div>
              <div>Platform: {event.platform}</div>
              <div>Source Type: {event.source_type}</div>
            </div>
            {event.link && (
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                {event.link}
              </a>
            )}
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-links">
            <section>
              <h4>🔹 Linked Structures:</h4>
              <ul>
                {event.linked_structures?.map(id => (
                  <li key={id}>{structures.find(s => s.id === id)?.name}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>🔹 Linked Contradictions:</h4>
              <ul>
                {event.linked_contradictions?.map(id => (
                  <li key={id}>{contradictions.find(c => c.id === id)?.name}</li>
                ))}
              </ul>
            </section>

            <section>
              <h4>🔹 Linked Struggles:</h4>
              <ul>
                {event.linked_struggles?.map(id => (
                  <li key={id}>{struggles.find(s => s.id === id)?.name}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="event-metrics">
            <div>Event Motion: {event.motion_type}</div>
            <div>Relevance: {event.relevance}</div>
            <div>Scale: {event.scale}</div>
            <div>Linked Phase ID: {event.linked_phase_id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverlayModal; 