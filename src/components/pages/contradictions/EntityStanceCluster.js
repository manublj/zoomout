import React from 'react';

const EntityStanceCluster = ({ entities }) => {
  return (
    <div className="entity-stance-cluster">
      <h4>Entity Stances</h4>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>{entity.name}: {entity.stance}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntityStanceCluster;