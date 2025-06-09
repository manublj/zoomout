import React from 'react';

const TimelineCanvasASCII = ({ timelines, contradictions, zoomLevel }) => {
  const renderASCII = () => {
    const groupedTimelines = timelines.reduce((acc, timeline) => {
      const contradiction = timeline.contradiction_id;
      if (!acc[contradiction]) {
        acc[contradiction] = [];
      }
      acc[contradiction].push(timeline);
      return acc;
    }, {});

    return `[ Timeline Canvas ]
+----------------------------------------------------------------------------------+
|  Time Range: 1900 -------------------------------------------- 2025              |
|                                                                                  |
${Object.entries(groupedTimelines).map(([contradictionId, timelines]) => {
  const contradiction = contradictions.find(c => c.id === contradictionId);
  return `|  |--------------------------------------------------------------------------------|
|  | Timeline: ${contradiction?.name || 'Untitled'} (${timelines[0]?.category || 'Historical Arc'})
|  |  ┌──────────────────────────────────────────────────────────────────────────┐  |
|  |  │ ${timelines[0]?.linked_phases?.map(phase => `■ [${phase.date_range}]`).join('  ') || 'No phases'}       │  |
|  |  │  ${timelines[0]?.event_ids?.map(id => `○ ${id}`).join('     ') || 'No events'}                 │  |
|  |  └──────────────────────────────────────────────────────────────────────────┘  |
|                                                                                  |`;
}).join('\n')}
|                                                                                  |
|  [Timeline Zoom Slider ▼]  [Timeline Scroll Bar]                                 |
+----------------------------------------------------------------------------------+`;
  };

  return <pre className="ascii-component">{renderASCII()}</pre>;
};

export default TimelineCanvasASCII; 