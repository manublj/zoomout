import React from 'react';

const StruggleListMini = ({ struggles }) => {
  return (
    <div className="struggle-list-mini">
      <h4>Struggles</h4>
      <ul>
        {struggles.map((struggle) => (
          <li key={struggle.id}>{struggle.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StruggleListMini;