import React from 'react';

const EventOverlayModalASCII = ({ event, structures, contradictions, struggles }) => {
  if (!event) return null;

  const renderASCII = () => {
    return `[ Selected Event Overlay ]
+----------------------------------------------------------------------------------+
| Title: ${event.title}
| Date: ${event.date}  | Location: ${event.location}
| Description: ${event.description?.substring(0, 100)}...
| Linked Structures: ${event.structure_ids?.join(', ')}
| Linked Contradictions: ${event.contradiction_ids?.join(', ')}
| Linked Struggles: ${event.struggle_ids?.join(', ')}
+----------------------------------------------------------------------------------+`;
  };

  return <pre className="ascii-component">{renderASCII()}</pre>;
};

export default EventOverlayModalASCII; 