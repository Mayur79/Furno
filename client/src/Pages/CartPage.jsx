import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cartImage from "../assets/cartimage.png";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;
const navigate=useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayCartProduct`, {
          params: { userId }
        });
        setCartItems(response.data.products);

        // Calculate subtotal when cart items are fetched
        calculateSubTotal(response.data.products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Function to calculate subtotal
  const calculateSubTotal = (items) => {
    let total = 0;
    items.forEach(item => {
      if (item.productDetails) {
        total += item.productDetails.price * item.quantity;
      }
    });
    setSubTotal(total);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/deleteCartProduct`, {
        data: { userId, productId }
      });
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-poppins">
        <div className="text-2xl font-semibold">Your cart is empty</div>
      </div>
    );
  }

  // Function to calculate total
  const total = subTotal; // For now, total is same as subtotal

  return (
    <div className='flex flex-col font-poppins gap-4 mx-4 sm:mx-8 md:mx-20'>
      <div className='relative text-white'>
        <img src={cartImage} alt="Cart" className='w-full' />
        <div className='absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50'>
          <div className='text-4xl md:text-6xl font-bold'>Cart</div>
          <div className='text-sm md:text-lg mt-2'>
            <span className='font-bold'>Home &gt; </span> Cart
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex flex-col w-full md:w-3/4'>
          <div className='flex justify-between bg-[#F9F1E7] py-3 px-2 md:px-8'>
            <div className='w-1/5 text-center text-xs md:text-base'>Product</div>
            <div className='w-1/5 text-center text-xs md:text-base'>Price</div>
            <div className='w-1/5 text-center text-xs md:text-base'>Quantity</div>
            <div className='w-1/5 text-center text-xs md:text-base'>Sub Total</div>
            <div className='w-1/5 text-center text-xs md:text-base'>Action</div>
          </div>

          {cartItems.map(item => (
            item.productDetails ? (
              <div key={item.productId} className='flex justify-between py-3 px-2 md:px-8'>
                <div className='w-1/5 text-center text-xs md:text-base'>{item.productDetails.name}</div>
                <div className='w-1/5 text-center text-xs md:text-base'>Rs. {item.productDetails.price}.00</div>
                <div className='w-1/5 text-center text-xs md:text-base'>{item.quantity}</div>
                <div className='w-1/5 text-center text-xs md:text-base'>Rs. {item.productDetails.price * item.quantity}.00</div>
                <div className='w-1/5 text-center'>
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className='text-red-500 text-lg md:text-2xl'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ) : (
              <div key={item.productId} className='flex justify-between py-3 px-2 md:px-8'>
                <div className='w-full text-center'>Product details not available</div>
              </div>
            )
          ))}
        </div>
        <div className='flex w-full md:w-1/4'>
          {/* Checkout Section */}
          <div className='flex flex-col gap-4 bg-[#F9F1E7] shadow-md p-4 rounded-md w-full'>
            <div className='text-2xl font-semibold mb-4 text-center'>Cart Totals</div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between mx-4'>
                <div>SubTotal:</div>
                <div>Rs. {subTotal}.00</div>
              </div>
              <div className='flex justify-between mx-4'>
                <div>Total:</div>
                <div>Rs. {total}.00</div>
              </div>
              <div className='flex justify-center'>
                <button className='border rounded-2xl border-[#000000] w-40 py-2' onClick={()=>navigate("/billingPage")} >Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
