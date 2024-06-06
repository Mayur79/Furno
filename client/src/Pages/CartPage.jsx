import React from 'react'
import cartImage from "../assets/cartimage.png";
const CartPage = () => {
  return (
    <>

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
      </div>
    </>
  )
}

export default CartPage