import React from 'react';

const StructureDetailModal = ({ structure, onClose }) => {
  return (
    <div className="structure-detail-modal">
      <button onClick={onClose}>Close</button>
      <h2>{structure.structure_name}</h2>
      <p>{structure.description}</p>
    </div>
  );
};

export default StructureDetailModal;