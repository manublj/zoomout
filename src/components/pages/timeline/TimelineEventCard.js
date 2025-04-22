import React from 'react';

const TimelineEventCard = ({ event, onClick }) => {
  if (!event) return null;

  return (
    <div className="timeline-event-card" onClick={onClick}>
      <h3>{event.title || 'Untitled Event'}</h3>
      <p>{event.date || 'No date available'}</p>
      <p>{event.description || 'No description available'}</p>
    </div>
  );
};

export default TimelineEventCard;