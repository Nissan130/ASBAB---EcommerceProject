import React, { useContext, useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { GlobalContext } from '../../Context/GlobalContext';

const NewCollections = () => {
  const { products } = useContext(GlobalContext); //fetch products
  console.log(products.new_price);
  

  return (
    <div className='newCollections-product'>
      <div className="newCollections-product-title">
        <h2>NEW COLLECTIONS</h2>
      </div>
      <div className="newCollections-product-item">
        {products.map((item) => (   
          <Item 
            key={item.product_id} // Ensure you have a unique identifier in your product data
            product_id={item.product_id}
            title={item.title} // Adjust property names based on your API response
            main_image={item.main_image} // Adjust to match your API response
            new_price={item.new_price}
            old_price={item.old_price}
            discount={item.discount}
          />
          
        ))}
      </div>

      <div className="newcollectioin-load-more">
        Load More...
      </div>
    </div>
  );
}

export default NewCollections;
