import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getProducts`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        {products.map((product) => (
          <div key={product._id} className="mb-4 p-4 border rounded shadow-sm">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <div className="flex flex-wrap">
              {product.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Product ${product.name}`}
                  className="w-32 h-32 object-cover m-1"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
export default ProductPage;
