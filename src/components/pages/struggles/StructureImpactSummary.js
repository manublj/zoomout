import React from 'react';

const StructureImpactSummary = ({ structures }) => {
  return (
    <div className="structure-impact-summary">
      <h4>Structure Impact</h4>
      <ul>
        {structures.map((structure) => (
          <li key={structure.id}>{structure.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StructureImpactSummary;