import React from 'react';
import category1 from "../../assets/category1.svg";
import category2 from "../../assets/category2.svg";
import category3 from "../../assets/category3.svg";

const CategorySection = () => {
  return (
    <div className='flex flex-col font-poppins gap-12 my-12 px-4 md:px-8'>
      <div className='flex flex-col'>
        <div className='font-bold text-3xl text-center'>
          Browse the Range
        </div>
        <div className='text-center text-[#666666]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-center gap-7'>
        <div className='flex flex-col items-center gap-4'>
          <div>
            <img src={category1} alt="Dining" className='w-full md:w-auto' />
          </div>
          <div className='text-center font-semibold text-xl'>
            Dining
          </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <div>
            <img src={category2} alt="Living" className='w-full md:w-auto' />
          </div>
          <div className='text-center font-semibold text-xl'>
            Living
          </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <div>
            <img src={category3} alt="Bedroom" className='w-full md:w-auto' />
          </div>
          <div className='text-center font-semibold text-xl'>
            Bedroom
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
