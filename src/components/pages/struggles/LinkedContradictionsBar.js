import React from 'react';

const LinkedContradictionsBar = ({ contradictions }) => {
  return (
    <div className="linked-contradictions-bar">
      <h4>Linked Contradictions</h4>
      <ul>
        {contradictions.map((contradiction) => (
          <li key={contradiction.id}>{contradiction.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LinkedContradictionsBar;