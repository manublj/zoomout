import React from 'react';

const ContradictionCard = ({ contradiction, onClick }) => {
  return (
    <div className="contradiction-card" onClick={onClick}>
      <h3>{contradiction.contradiction_name}</h3>
      <p>{contradiction.contradiction_description}</p>
    </div>
  );
};

export default ContradictionCard;