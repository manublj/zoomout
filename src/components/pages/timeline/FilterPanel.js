import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, contradictions }) => {
  return (
    <div className="filter-panel">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search timelines..."
          value={filters.searchText}
          onChange={(e) => onFilterChange({ searchText: e.target.value })}
          className="search-input"
        />
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="historical">Historical Arc</option>
          <option value="thematic">Thematic Sequence</option>
          <option value="struggle">Struggle Timeline</option>
        </select>

        {/* Contradiction Filter */}
        <select
          value={filters.contradiction}
          onChange={(e) => onFilterChange({ contradiction: e.target.value })}
          className="filter-select"
        >
          <option value="all">All Contradictions</option>
          {contradictions?.map(contradiction => (
            <option key={contradiction.id} value={contradiction.id}>
              {contradiction.name}
            </option>
          ))}
        </select>

        {/* Zoom Level Filter */}
        <select
          value={filters.zoomLevel}
          onChange={(e) => onFilterChange({ zoomLevel: e.target.value })}
          className="filter-select"
        >
          <option value="year">Year View</option>
          <option value="decade">Decade View</option>
          <option value="phase">Phase View</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel; 