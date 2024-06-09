import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import billin from "../assets/billin.png";
import Select from 'react-select';
import { getData } from 'country-list';

const BillingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [payPalClientId, setPayPalClientId] = useState('');

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;

  const countries = getData().map(country => ({
    value: country.code,
    label: country.name
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleChange = selectedOption => {
    setSelectedCountry(selectedOption);
  };


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/displayCartProduct`, {
          params: { userId }
        });
        setCartItems(response.data.products);
        calculateSubTotal(response.data.products);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchPayPalClientId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/paypal`);
        setPayPalClientId(response.data.clientId);
      } catch (error) {
        console.error('Error fetching PayPal client ID:', error);
      }
    };

    fetchCartItems();
    fetchPayPalClientId();
  }, [userId]);

  const calculateSubTotal = (items) => {
    let total = 0;
    items.forEach(item => {
      if (item.productDetails) {
        total += item.productDetails.price * item.quantity;
      }
    });
    setSubTotal(total);
  };

  const handleApprove = async (orderId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/pay`, {
        orderId,
        userId,
        amount: subTotal,
        items: cartItems
      });
      console.log('Payment Successful:', response.data);
      // Handle post-payment actions like updating the database, showing a confirmation message, etc.
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };


  return (

    <>
    <div className='flex flex-col'>
    <div className='relative text-white'>
        <img src={billin} alt="Cart" className='w-full' />
        <div className='absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50'>
          <div className='text-4xl md:text-6xl font-bold'>Checkout</div>
          <div className='text-sm md:text-lg mt-2'>
            <span className='font-bold'>Home &gt; </span> Checkout
          </div>
        </div>
      </div>
      <div className='flex gap-4 mx-48 my-12'>
        <div className='flex flex-col w-1/2'>

<div className='text-3xl font-semibold'>
Billing details
</div>
<form action="" className='flex flex-col mt-8 gap-4'>

  <div className='flex gap-6'>
    <div className='flex flex-col gap-2'>
      <label htmlFor="" className='font-semibold'>First name</label>
      <input type="text" name="fname" id=""  className='border border-[#9F9F9F] rounded-lg py-3'/>
    </div>
    <div className='flex flex-col gap-2'>
      <label htmlFor="" className='font-semibold'>Last name</label>
      <input type="text" name="lname" id=""  className='border border-[#9F9F9F] rounded-lg py-3'/>
    </div>
  </div>
  <div className='flex flex-col gap-2'>
  <label htmlFor="" className='font-semibold'>Country/Region</label>
    <div>
    <Select
        value={selectedCountry}
        onChange={handleChange}
        options={countries}
        placeholder="Select a country"
        className=' w-3/4'
      />
    </div>

  </div>
  <div className='flex flex-col gap-2'>
  <label htmlFor="" className='font-semibold'>Street Address</label>
  <input type="text" name="fname" id=""  className='border border-[#9F9F9F] rounded-lg py-3 w-3/4'/>
  </div>
</form>
        </div>



        
        <div className='flex w-1/2'>
        <div className='w-full md:w-2/3'>
        <div className='bg-[#F9F1E7] shadow-md p-4 rounded-md'>
          <div className='text-2xl font-semibold mb-4'>Order Summary</div>
          {cartItems.map(item => (
            <div key={item.productId} className='flex justify-between py-2'>
              <div>{item.productDetails.name}</div>
              <div>Rs. {item.productDetails.price} x {item.quantity}</div>
              <div>Rs. {item.productDetails.price * item.quantity}</div>
            </div>
          ))}
          <div className='flex justify-between py-2 font-bold'>
            <div>Total:</div>
            <div>Rs. {subTotal}.00</div>
          </div>
          {payPalClientId && (
            <PayPalScriptProvider options={{ "client-id": payPalClientId }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: subTotal.toString()
                      }
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(details => {
                    handleApprove(data.orderID);
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BillingPage;
