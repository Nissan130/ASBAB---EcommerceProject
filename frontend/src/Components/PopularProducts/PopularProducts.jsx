import React from 'react'
import './PopularProducts.css'
import Item from '../Item/Item'
import all_product from '../Assets/all_product'


const PopularProducts = () => {
  return (
    <div className='popularProducts'>
      <div className="popularProducts-title">
        <h2>POPULAR PRODUCTS</h2>
      </div>
     <div className="products">
      {all_product.map((item,i) =>{
        return (
          <Item 
          key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
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
