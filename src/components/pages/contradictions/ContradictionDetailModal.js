import React from 'react';

const ContradictionDetailModal = ({ contradiction, onClose }) => {
  return (
    <div className="contradiction-detail-modal">
      <button onClick={onClose}>Close</button>
      <h2>{contradiction.contradiction_name}</h2>
      <p>{contradiction.contradiction_description}</p>
    </div>
  );
};

export default ContradictionDetailModal;