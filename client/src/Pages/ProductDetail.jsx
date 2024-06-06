import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Star } from '../component/Hooks/helper';
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillTwitterCircle } from "react-icons/ai";
import { faShareAlt, faCartPlus,faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId=auth.user._id;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getSpecificProduct/${productId}`);
        setProduct(response.data);
        console.log("Auth ",auth);
        console.log("USrri ",userId)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getProducts`);
        const filteredProducts = response.data.filter(product => product._id !== productId);
        
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);
  
  if (!product) {
    return <div>Loading...</div>;
  }

  const increaseProduct = () => {
    setCount(count + 1);
  };

  const decreaseProduct = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`;
    window.open(url, '_blank');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${window.location.href}&text=Check out this product: ${product.name}`;
    window.open(url, '_blank');
  };

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


  const addToCart = async () => {
   // Replace with actual user ID logic
    const productToAdd = {
        productId: product.id,
        quantity: count,
    };
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/addtoCart`, {
            products: [productToAdd],
            userId:userId,
        });
        console.log('Product added to cart:', response.data);
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};
  return (
    <>
      <div className='flex flex-col gap-8'>
        <div className='bg-[#F9F1E7] items-center py-5 pl-12 flex gap-3'>
          <div className='text-[#9F9F9F]'>
            Home
          </div>
          <div className='font-bold'>
            {`>`}
          </div>
          <div className='text-[#9F9F9F]'>
            Shop
          </div>
          <div className='font-bold'>
            {`>`}
          </div>
          <div className='flex items-center gap-3'>
            <div className="inline-block h-2 min-h-[1.7em] w-[1.5px] self-stretch bg-[#9F9F9F]"></div>
            {product.name}
          </div>
        </div>

        <div className='flex mx-20'>
          <div className='flex w-1/2 gap-12'>
            <div className='flex flex-col'>
              {product.photos.map((photo, index) => (
                <img 
                  key={index} 
                  src={photo} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full max-w-lg m-2" 
                />
              ))}
            </div>
            <div className='bg-[#F9F1E7] border rounded-xl items-center'>
              <img src={product.mainphotos} alt="" />
            </div>
          </div>

          <div className='flex flex-col w-1/2 gap-2'>
            <div className='text-4xl font-bold'>
              {product.name}
            </div>
            <div className='text-[#9F9F9F] text-2xl font-semibold'>
              Rs.  {product.price*count}.00
            </div>
            <div className='flex gap-4 items-center'>
              <div className='flex gap-2'>
                <Star rating={product.reviews} />
              </div>
              <div className="inline-block h-2 min-h-[1.7em] w-[1.5px] self-stretch bg-[#9F9F9F]"></div>
              <div className='text-[#9F9F9F]'>
                {product.totalreviews} Customer Reviews
              </div>
            </div>
            <div className='line-clamp-4 w-3/4'>
              {product.description}
            </div>
            <div className='flex gap-4 items-center'>
              <div className='border border-[#9F9F9F] flex py-2 px-4 justify-center gap-4 items-center rounded-md'>
                <div>
                  <button onClick={decreaseProduct}>
                    -
                  </button>
                </div>
                <div className='mx-1'>
                  {count}
                </div>
                <div>
                  <button onClick={increaseProduct}>
                    +
                  </button>
                </div>
              </div>
              <button onClick={addToCart} className='border border-[#000000] flex py-2 px-8 font-medium justify-center gap-4 items-center rounded-md'>
                Add to Cart
              </button>
              <div className='border border-[#000000] flex py-2 px-8 font-medium justify-center gap-4 items-center rounded-md'>
                + Compare
              </div>
            </div>
            <div>
              <div className="inline-block h-[0.1em] w-4/5 self-stretch bg-[#D9D9D9] mt-7 mb-4"></div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex text-[#9F9F9F]'>
                <div className='w-28'>
                  SKU
                </div>
                <div className='flex gap-2'>
                  <div>
                    :
                  </div>
                  SS001
                </div>
              </div>
              <div className='flex text-[#9F9F9F]'>
                <div className='w-28'>
                  Category
                </div>
                <div className='flex gap-2'>
                  <div>
                    :
                  </div>
                  {product.category}
                </div>
              </div>
              <div className='flex text-[#9F9F9F]'>
                <div className='w-28'>
                  Tags
                </div>
                <div className='flex gap-2'>
                  <div>
                    :
                  </div>
                  Sofa, Chair, Home, Shop
                </div>
              </div>
              <div className='flex'>
                <div className='w-28 text-[#9F9F9F]'>
                  Share
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-[#9F9F9F]'>
                    :
                  </span>
                  <div className='flex gap-3 items-center'>
                    <div>
                      <button onClick={shareOnFacebook}>
                        <BiLogoFacebookCircle className='text-xl' />
                      </button>
                    </div>
                    <div>
                      <button onClick={shareOnLinkedIn}>
                        <IoLogoLinkedin className='text-xl' />
                      </button>
                    </div>
                    <div>
                      <button onClick={shareOnTwitter}>
                        <AiFillTwitterCircle className='text-xl' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="inline-block h-[0.1em] w-full self-stretch bg-[#D9D9D9] mt-7"></div>
        </div>
        <div className='flex flex-col gap-4 justify-center'>
          <div className='text-center text-2xl font-semibold'>
            Description
          </div>
          <div className='mx-20 text-[#9F9F9F]'>
            {product.description}
          </div>
        </div>

        <div>
          <div className='text-center text-2xl font-semibold'>Related Products</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <div key={relatedProduct._id} className="relative border flex flex-col group">
            <div className="flex h-5/6">
            
                <img
                  src={relatedProduct.mainphotos}
                  alt={`Product ${relatedProduct.name}`}
                  className="object-cover w-full transition-opacity duration-300 group-hover:opacity-50"
                />
            
            </div>
            <div className="flex flex-col gap-1 h-2/6 bg-[#F4F5F7] p-5">
              <div>
                <span className="text-xl font-semibold">{relatedProduct.name}</span>
              </div>
              <div className="text-[#898989] font-medium text-sm">
                {relatedProduct.subheading}
              </div>
              <div className="flex justify-between">
                <div className="text-[#3A3A3A] font-semibold text-lg">
                  Rp {relatedProduct.price}.00
                </div>
                {product.realprice && (
                  <div className="text-[#B0B0B0] line-through">
                    Rp {relatedProduct.realprice}.00
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col gap-4 ">
                <button className="bg-white text-[#B88E2F] py-2 px-10 font-semibold rounded flex items-center" onClick={addToCart}>
              
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

      </div>
    </>
  );
};

export default ProductDetail;
