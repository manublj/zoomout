import React from 'react';

const StruggleDetailModal = ({ struggle, onClose }) => {
  return (
    <div className="struggle-detail-modal">
      <button onClick={onClose}>Close</button>
      <h2>{struggle.struggle_name}</h2>
      <p>{struggle.struggle_description}</p>
    </div>
  );
};

export default StruggleDetailModal;