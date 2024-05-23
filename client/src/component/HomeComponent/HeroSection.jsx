import React from 'react';
import homepage from "../../assets/homepage.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat font-poppins"
      style={{ backgroundImage: `url(${homepage})` }}
    >
      <div className="px-4 py-32 lg:h-screen flex justify-end items-center">
        <div className='flex flex-col gap-3 w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto lg:h-96 bg-[#FFF3E3] py-12 px-8 lg:px-10 mr-4 lg:mr-20 rounded-xl'>
          <div className='text-[#333333] font-semibold tracking-widest'>
            New Arrival
          </div>
          <div className='text-[#B88E2F] text-3xl lg:text-5xl font-extrabold'>
            Discover Our 
          </div>
          <div className='text-[#B88E2F] text-3xl lg:text-5xl font-extrabold'>
            New Collection
          </div>
          <div className='text-xs lg:text-sm font-bold'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </div>
          <div>
            <button className='bg-[#B88E2F] text-white py-3 px-8 lg:py-5 lg:px-16 mt-8 font-bold'>
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
