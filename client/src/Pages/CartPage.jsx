import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cartImage from "../assets/cartimage.png";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayCartProduct`, {
          params: { userId }
        });
        setCartItems(response.data.products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  if (cartItems.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className='flex flex-col font-poppins'>
      <div className='relative'>
        <img src={cartImage} alt="" className='w-full' />
        <div className='absolute inset-0 flex flex-col justify-center items-center'>
          <div className='text-4xl md:text-6xl font-bold'>Cart</div>
          <div className='text-sm md:text-lg mt-2'>
            <span className='font-bold'>Home &gt; </span> Cart
          </div>
        </div>
      </div>
      <div>
        {cartItems.map(item => (
          item.productDetails ? (
            <div key={item.productId} className='cart-item'>
              <div>Product Name: {item.productDetails.name}</div>
              <div>Product Price: Rs. {item.productDetails.price}.00</div>
              <div>Quantity: {item.quantity}</div>
              <div>Total: Rs. {item.productDetails.price * item.quantity}.00</div>
            </div>
          ) : (
            <div key={item.productId} className='cart-item'>
              <div>Product details not available</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CartPage;
