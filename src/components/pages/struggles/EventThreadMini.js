import React from 'react';

const EventThreadMini = ({ events }) => {
  return (
    <div className="event-thread-mini">
      <h4>Event Thread</h4>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventThreadMini;