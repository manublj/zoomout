import React from 'react';
import './DialecticHeatmap.css';

const DialecticHeatmap = ({ structures, phases }) => {
  // Group structures into opposing pairs
  const opposingPairs = structures.reduce((pairs, structure, index) => {
    if (index % 2 === 0 && index < structures.length - 1) {
      pairs.push({
        structure1: structure,
        structure2: structures[index + 1]
      });
    }
    return pairs;
  }, []);

  return (
    <div className="dialectic-heatmap">
      {opposingPairs.map((pair, index) => (
        <div key={index} className="opposing-pair">
          <div className="structure-label">{pair.structure1.name}</div>
          <div className="heatmap-bar">
            {phases.map((phase, phaseIndex) => (
              <div 
                key={phaseIndex}
                className="heatmap-segment"
                style={{
                  backgroundColor: `rgba(220, 53, 69, ${phase.intensity || 0.5})`,
                  width: `${100 / phases.length}%`
                }}
                title={`${phase.name}: ${phase.intensity || 0.5} intensity`}
              />
            ))}
          </div>
          <div className="structure-label">{pair.structure2.name}</div>
        </div>
      ))}
    </div>
  );
};

export default DialecticHeatmap;
