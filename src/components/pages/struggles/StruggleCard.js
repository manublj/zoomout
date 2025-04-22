import React from 'react';

const StruggleCard = ({ struggle, onClick }) => {
  return (
    <div className="struggle-card" onClick={onClick}>
      <h3>{struggle.struggle_name}</h3>
      <p>{struggle.struggle_description}</p>
    </div>
  );
};

export default StruggleCard;