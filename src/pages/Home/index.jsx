import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Hero from './Hero/Hero'
import CategoryArea from './CategoryArea/CategoryArea'
import AboutArea from './AboutArea/AboutArea'
import ServiceArea from './ServiceArea/ServiceArea'
import RecentGallery from './RecentGallery/RecentGallery'
import CounterArea from './CounterArea/CounterArea'
import Brands from './Brands/Brands'
import BlogArea from './BlogArea/BlogArea'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CategoryArea/>
      <AboutArea/>
      <ServiceArea/>
      <RecentGallery/>
      <CounterArea/>
      <Brands/>
      {/* <BlogArea/> */}
        
      
    </div>
  )
}

export default Home
