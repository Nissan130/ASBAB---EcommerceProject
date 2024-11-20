import React, { useContext, useState } from 'react';
import './PopularProducts.css';
import Item from '../Item/Item';
import { GlobalContext } from '../../Context/GlobalContext';

const PopularProducts = () => {
  const { products } = useContext(GlobalContext); 
  const [showAll, setShowAll] = useState(false); // State to toggle showing all products

  // Display up to 15 products initially, show all if "showAll" is true
  const displayedProducts = showAll ? products : products.slice(0, 15);

  return (
    <div className='popularProducts'>
      <div className="popularProducts-title">
        <h2>POPULAR PRODUCTS</h2>
      </div>
      <div className="products">
        {displayedProducts.map((item, i) => (
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

      {/* Show "Load More" button only if there are more than 15 products and "showAll" is false */}
      {products.length > 15 && !showAll && (
        <div className="popularproduct-load-more">
          <button onClick={() => setShowAll(true)}>Load More...</button>
        </div>
      )}
    </div>
  );
}

export default PopularProducts;
