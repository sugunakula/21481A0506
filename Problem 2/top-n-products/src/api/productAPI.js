import axios from 'axios';

const getTopNProducts = async (params) => {
  try {
    const response = await axios.get('/api/top-n-products', { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getTopNProducts, getProductDetails };
