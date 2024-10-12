import React, { useContext, useEffect, useState } from 'react'
import './PopularProducts.css'
import Item from '../Item/Item'
import { GlobalContext } from '../../Context/GlobalContext';


const PopularProducts = () => {
  const { products } = useContext(GlobalContext); 

  return (
    <div className='popularProducts'>
      <div className="popularProducts-title">
        <h2>POPULAR PRODUCTS</h2>
      </div>
     <div className="products">
      {products.map((item,i) =>{
        return (
          <Item 
            key={item.product_id} // Ensure you have a unique identifier in your product data
            product_id={item.product_id}
            title={item.title} // Adjust property names based on your API response
            main_image={item.main_image} // Adjust to match your API response
            new_price={item.new_price}
            old_price={item.old_price}
            discount={item.discount}
          />
        )
      })}
     </div>

     <div className="popularproduct-load-more">
      Load More...
     </div>
    </div>
  )
}

export default PopularProducts
