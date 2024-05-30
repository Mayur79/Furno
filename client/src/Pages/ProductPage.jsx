import React, { useEffect, useState } from 'react';
import axios from 'axios';
import shopimage from "../assets/shopimage.png";
import { faShareAlt, faCartPlus, faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shop1 from "../assets/shop1.svg";
import shop2 from "../assets/shop2.svg";
import shop3 from "../assets/shop3.svg";
import shop4 from "../assets/shop4.svg";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getProducts`);
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage));
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePriceFilterChange = (event) => {
    setSelectedPriceFilter(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
  };

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedPriceFilter) {
      switch (selectedPriceFilter) {
        case 'low-to-high':
          filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
          break;
        case 'high-to-low':
          filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className='flex flex-col font-poppins'>
      <div className='relative'>
        <img src={shopimage} alt="" className='w-full' />
        <div className='absolute inset-0 flex flex-col justify-center items-center'>
          <div className='text-4xl md:text-6xl font-bold'>Shop</div>
          <div className='text-sm md:text-lg mt-2'>
            <span className='font-bold'>Home &gt; </span> Shop
          </div>
        </div>
      </div>
      <div className='bg-[#F9F1E7] py-4 px-4 md:px-20'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center gap-4 mb-4 md:mb-0'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m-1 2h-11m16 0h-3" />
              </svg>
            </div>
            <div>Filter</div>
            <div className='flex items-center gap-4'>
              <div className="inline-block h-2 min-h-[1.5em] w-[1px] self-stretch bg-[#9F9F9F]"></div>
              <p className='font-semibold text-sm'>
                Showing {startIndex + 1}–{endIndex} of {filteredProducts.length} results
              </p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <div>Sort By price</div>
            <div>
              <select value={selectedPriceFilter} onChange={handlePriceFilterChange} className='bg-white border p-2 rounded'>
                <option value="">Select</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto my-16 px-4 md:px-0">
        {currentProducts.map((product) => (
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
              <div className="flex flex-col gap-4">
                <button className="bg-white text-[#B88E2F] py-2 px-10 font-semibold rounded flex items-center">
                  <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
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

      <div className="flex justify-center my-8">
        <nav>
          <ul className="flex list-none p-0 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`py-2 px-4 ${currentPage === index + 1 ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'} rounded`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="py-2 px-4 bg-[#F9F1E7] text-black rounded"
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className='flex flex-col md:flex-row bg-[#FAF3EA] py-16 justify-center gap-10 md:gap-20 px-4 md:px-0'>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={shop1} alt="" />
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold'>
              High Quality
            </div>
            <div className='text-sm text-[#898989]'>
              crafted from top materials
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={shop2} alt="" />
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold'>
              Warranty Protection
            </div>
            <div className='text-sm text-[#898989]'>
              Over 2 years
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={shop3} alt="" />
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold'>
              Free Shipping
            </div>
            <div className='text-sm text-[#898989]'>
              Order over 150 $
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={shop4} alt="" />
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold'>
              24 / 7 Support
            </div>
            <div className='text-sm text-[#898989]'>
              Dedicated support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
