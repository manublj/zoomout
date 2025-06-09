import React from 'react';

const FilterPanelASCII = ({ filters, onFilterChange, contradictions }) => {
  const renderASCII = () => {
    return `[ Filters / Controls ]
+----------------------------------------------------------------------------------+
| [Search: ${filters.search || ''}]  [Category: ${filters.category || 'All'}]  [Contradiction: ${filters.contradiction || 'All'}]  [Zoom: ${filters.zoomLevel}] |
+----------------------------------------------------------------------------------+`;
  };

  return <pre className="ascii-component">{renderASCII()}</pre>;
};

export default FilterPanelASCII; 