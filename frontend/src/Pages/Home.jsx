import React from 'react'
import BannerImage from '../Components/BannerImage/BannerImage'
import PopularProducts from '../Components/PopularProducts/PopularProducts'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Footer from '../Components/Footer/Footer'

const Home = () => {
  return (
    <div>
      <BannerImage />
      <PopularProducts />
      <NewsLetter />
      {/* <Footer /> */}
    </div>
  )
}

export default Home
