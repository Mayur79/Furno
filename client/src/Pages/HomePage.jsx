import React from 'react'
import HeroSection from '../component/HomeComponent/HeroSection';
import ProductPage from './ProductPage';
import CategorySection from '../component/HomeComponent/CategorySection';
import ProdcutSection from '../component/HomeComponent/ProdcutSection';

const HomePage = () => {
  return (
   <div>
    <HeroSection/>
    <CategorySection/>
    <ProdcutSection/>
   </div>
  )
}

export default HomePage;