import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const BillingPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [payPalClientId, setPayPalClientId] = useState('');

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;

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

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen font-poppins">
        <div className="text-2xl font-semibold">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center font-poppins gap-4 mx-4 sm:mx-8 md:mx-20'>
      <div className='text-4xl font-bold mb-4'>Billing Page</div>
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
  );
};

export default BillingPage;
