import React from 'react';

const StructureFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="structure-filters">
      <input
        type="text"
        name="search"
        placeholder="Search structures..."
        value={filters.search || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default StructureFilters;