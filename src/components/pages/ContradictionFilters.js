import React from 'react';

const ContradictionFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="contradiction-filters">
      <input
        type="text"
        name="search"
        placeholder="Search contradictions..."
        value={filters.search || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ContradictionFilters;