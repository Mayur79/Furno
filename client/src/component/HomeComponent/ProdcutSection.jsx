import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faShareAlt, faCartPlus,faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductSection = () => {
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

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subheading,
        url: window.location.href, // Current page URL, change if needed
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="flex flex-col font-poppins gap-4 my-16">
      <div>
        <h2 className="font-extrabold text-center text-3xl">Our Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
        {products.map((product) => (
          <div key={product._id} className="relative border flex flex-col group">
            <div className="flex h-5/6">
              {product.photos.length > 0 && (
                <img
                  src={product.photos[0]}
                  alt={`Product ${product.name}`}
                  className="object-cover w-full transition-opacity duration-300 group-hover:opacity-50"
                />
              )}
            </div>
            <div className="flex flex-col gap-1 h-2/6 bg-[#F4F5F7] p-5">
              <div>
                <span className="text-xl font-semibold">{product.name}</span>
              </div>
              <div className="text-[#898989] font-medium text-sm">
                {product.subheading}
              </div>
              <div className="flex justify-between">
                <div className="text-[#3A3A3A] font-semibold text-lg">
                  Rp {product.price}.00
                </div>
                {product.realprice && (
                  <div className="text-[#B0B0B0] line-through">
                    Rp {product.realprice}.00
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col gap-4 ">
                <button className="bg-white text-[#B88E2F] py-2 px-10 font-semibold rounded flex items-center">
              
                  Add to Cart
                </button>
                <div className='flex justify-between'>

               
                <button
                  className="flex text-white items-center"
                  onClick={() => handleShare(product)}
                >
                  <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
                  Share
                </button>
                <button
                  className="flex text-white items-center"
                  onClick={() => handleShare(product)}
                >
             <FontAwesomeIcon icon={faCodeCompare} />
                  Compare
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
