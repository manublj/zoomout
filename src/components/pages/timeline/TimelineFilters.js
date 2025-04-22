import React from 'react';

const TimelineFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="timeline-filters">
      <input
        type="text"
        name="search"
        placeholder="Search events..."
        value={filters.search || ''}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TimelineFilters;