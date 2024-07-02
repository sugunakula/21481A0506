import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../api/productAPI';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductDetails(productId);
      setProduct(data);
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      {/* Render other product details here */}
    </div>
  );
};

export default ProductDetails;
