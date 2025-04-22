import React from 'react';

const StruggleFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="struggle-filters">
      <input
        type="text"
        name="search"
        placeholder="Search struggles..."
        value={filters.search || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default StruggleFilters;