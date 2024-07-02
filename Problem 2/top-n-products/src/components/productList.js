import React, { useState, useEffect } from 'react';
import { getTopNProducts } from '../api/productAPI';
import FilterBar from './filterBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getTopNProducts({...filters, page: currentPage });
      setProducts(data);
    };

    fetchProducts();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      {/* Render products list and pagination controls */}
    </div>
  );
};

export default ProductList;
