import React from 'react';

const EntityInvolvementTags = ({ entities }) => {
  return (
    <div className="entity-involvement-tags">
      <h4>Entity Involvement</h4>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>{entity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntityInvolvementTags;