import React from 'react';

const ContradictionListMini = ({ contradictions }) => {
  return (
    <div className="contradiction-list-mini">
      <h4>Contradictions</h4>
      <ul>
        {contradictions.map((contradiction) => (
          <li key={contradiction.id}>{contradiction.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContradictionListMini;