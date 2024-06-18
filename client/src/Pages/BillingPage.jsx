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

  const indianStates = [
    { value: 'AN', label: 'Andaman and Nicobar Islands' },
    { value: 'AP', label: 'Andhra Pradesh' },
    { value: 'AR', label: 'Arunachal Pradesh' },
    { value: 'AS', label: 'Assam' },
    { value: 'BR', label: 'Bihar' },
    { value: 'CH', label: 'Chandigarh' },
    { value: 'CT', label: 'Chhattisgarh' },
    { value: 'DN', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'DL', label: 'Delhi' },
    { value: 'GA', label: 'Goa' },
    { value: 'GJ', label: 'Gujarat' },
    { value: 'HR', label: 'Haryana' },
    { value: 'HP', label: 'Himachal Pradesh' },
    { value: 'JK', label: 'Jammu and Kashmir' },
    { value: 'JH', label: 'Jharkhand' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'KL', label: 'Kerala' },
    { value: 'LA', label: 'Ladakh' },
    { value: 'LD', label: 'Lakshadweep' },
    { value: 'MP', label: 'Madhya Pradesh' },
    { value: 'MH', label: 'Maharashtra' },
    { value: 'MN', label: 'Manipur' },
    { value: 'ML', label: 'Meghalaya' },
    { value: 'MZ', label: 'Mizoram' },
    { value: 'NL', label: 'Nagaland' },
    { value: 'OR', label: 'Odisha' },
    { value: 'PY', label: 'Puducherry' },
    { value: 'PB', label: 'Punjab' },
    { value: 'RJ', label: 'Rajasthan' },
    { value: 'SK', label: 'Sikkim' },
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'TG', label: 'Telangana' },
    { value: 'TR', label: 'Tripura' },
    { value: 'UP', label: 'Uttar Pradesh' },
    { value: 'UT', label: 'Uttarakhand' },
    { value: 'WB', label: 'West Bengal' },
    { value: 'OTHER', label: 'Other' }
  ];

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.user._id;

  const countries = getData().map(country => ({
    value: country.code,
    label: country.name
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [cityName, setCityName] = useState('');

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    address: '',
    city: '',
    zipcode: '',
    phnumber: '',
    email: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStateChange = selectedOption => {
    setSelectedState(selectedOption);
    setCityName(''); // Reset city name when state changes
  };

  const handleCityNameChange = event => {
    setCityName(event.target.value);
  };

  const handleCountryChange = selectedOption => {
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
     
      const billingDetails = {
        ...formData,
        country: selectedCountry?.label || '',
        state: selectedState?.label || '',
        city: selectedState?.value === 'OTHER' ? cityName : formData.city
      };
      console.log("Billing Details:", billingDetails); // Debugging statement

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/pay`, {
        orderId,
        userId,
        amount: subTotal,
        items: cartItems,
        billingDetails
      });

      console.log('Payment Successful:', response.data);
      // Handle post-payment actions like updating the database, showing a confirmation message, etc.
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/submitBillingDetails`, {
        userId,
        billingDetails: {
          ...formData,
          country: selectedCountry?.label || '',
          state: selectedState?.label || '',
          city: selectedState?.value === 'OTHER' ? cityName : formData.city
        }
      });
    
      console.log('Billing details submitted successfully:', response.data);
      // Handle success actions
    } catch (error) {
      console.error('Error submitting billing details:', error);
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
        <div className='flex flex-col md:flex-row gap-4 md:mx-24 lg:mx-48 my-12 px-5'>
          <div className='flex flex-col w-full md:w-1/2'>
            <div className='text-3xl font-semibold'>Billing details</div>
            <form action="" className='flex flex-col mt-8 gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-col gap-2 w-full md:w-52'>
                  <label htmlFor="" className='font-semibold'>First name</label>
                  <input type="text" name="fname" id="" value={formData.fname} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4' />
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/3'>
                  <label htmlFor="" className='font-semibold'>Last name</label>
                  <input type="text" name="lname" id="" value={formData.lname} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4' />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Country/Region</label>
                <div>
                  <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countries}
                    placeholder="Select a country"
                    className='w-full md:w-3/4'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Street Address</label>
                <input type="text" name="address" id="" value={formData.address} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Town / City</label>
                <input type="text" name="city" id="" value={formData.city} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>State</label>
                <div>
                  <Select
                    value={selectedState}
                    onChange={handleStateChange}
                    options={indianStates}
                    placeholder="Select an Indian state"
                    className='w-full md:w-3/4'
                  />
                  {selectedState && selectedState.value === 'OTHER' && (
                    <div className='flex flex-col gap-2 mt-4'>
                      <label className='font-semibold'>Enter City Name:</label>
                      <input
                        type="text"
                        value={cityName}
                        onChange={handleCityNameChange}
                        placeholder="Enter your city name"
                        className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Zip Code</label>
                <input type="number" name="zipcode" id="" value={formData.zipcode} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Phone Number</label>
                <input type="number" name="phnumber" id="" value={formData.phnumber} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className='font-semibold'>Email</label>
                <input type="email" name="email" id="" value={formData.email} onChange={handleInputChange} className='border border-[#9F9F9F] rounded-lg py-3 px-4 w-full md:w-3/4' />
              </div>
              <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full md:w-3/4">Submit</button>
            </form>
          </div>
          <div className='flex flex-col w-full md:w-1/2'>
            <div className='flex justify-between'>
              <div className='font-semibold'>Product</div>
              <div className='font-semibold'>SubTotal</div>
            </div>
            <div>
              {cartItems.map(item => (
                <div key={item.productId} className='flex justify-between py-2'>
                  <div className='text-[#9F9F9F]'>{item.productDetails.name}</div>
                  <div>Rs. {item.productDetails.price} x {item.quantity}</div>
                  <div>Rs. {item.productDetails.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className='flex justify-between'>
              <div>SubTotal</div>
              <div>Rs. {subTotal}.00</div>
            </div>
            <div className='flex justify-between mt-2 items-center'>
              <div>Total</div>
              <div className='text-[#B88E2F] font-bold text-xl'>Rs. {subTotal}.00</div>
            </div>
            <div className='mt-4'>
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
    </>
  );
  
};

export default BillingPage;
