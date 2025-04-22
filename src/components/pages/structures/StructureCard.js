import React from 'react';

const StructureCard = ({ structure, onClick }) => {
  return (
    <div className="structure-card" onClick={onClick}>
      <h3>{structure.structure_name}</h3>
      <p>{structure.description}</p>
    </div>
  );
};

export default StructureCard;