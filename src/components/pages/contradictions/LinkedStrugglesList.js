import React from 'react';

const LinkedStrugglesList = ({ struggles }) => {
  return (
    <div className="linked-struggles-list">
      <h4>Linked Struggles</h4>
      <ul>
        {struggles.map((struggle) => (
          <li key={struggle.id}>{struggle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LinkedStrugglesList;