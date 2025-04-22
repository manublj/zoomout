import React from 'react';

const ContradictionTimelineMini = ({ contradiction }) => {
  return (
    <div className="contradiction-timeline-mini">
      <h4>Timeline for {contradiction.name}</h4>
      <p>Details about the timeline...</p>
    </div>
  );
};

export default ContradictionTimelineMini;