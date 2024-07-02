import React from 'react';
import { TextField, Button } from '@mui/material';

const FilterBar = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField name="category" label="Category" onChange={handleFilterChange} />
      <TextField name="priceRange" label="Price Range" onChange={handleFilterChange} />
      <TextField name="rating" label="Rating" onChange={handleFilterChange} />
      <Button variant="contained" color="primary">Apply Filters</Button>
    </div>
  );
};

export default FilterBar;
