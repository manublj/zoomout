import React from 'react';
import './ContradictionSummaryBox.css';

const ContradictionSummaryBox = ({ contradictions, selectedContradiction }) => {
  if (!contradictions || !selectedContradiction || selectedContradiction === 'all') {
    return null;
  }

  const contradiction = contradictions.find(c => c.id === selectedContradiction);
  if (!contradiction) return null;

  return (
    <div className="contradiction-summary-box">
      <div className="summary-header">
        <h3>{contradiction.name}</h3>
      </div>
      <div className="summary-content">
        <p>{contradiction.description}</p>
      </div>
    </div>
  );
};

export default ContradictionSummaryBox; 