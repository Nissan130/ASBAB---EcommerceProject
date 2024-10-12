import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchProducts.css';
import Item from '../Item/Item';
import { GlobalContext } from '../../Context/GlobalContext';

const SearchProducts = ({ filteredProducts = [] }) => {
  const { products } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const [searchProd, setSearchProd] = useState(filteredProducts);

  const queryFromUrl = searchParams.get('query');
  const categoryFromUrl = searchParams.get('category');

  useEffect(() => {
    let filteredProds;

    if (queryFromUrl) {
      // Filter products based on the search term from URL
      filteredProds = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
          product.category.toLowerCase().includes(queryFromUrl.toLowerCase())
      );
    } else if (categoryFromUrl) {
      // Filter products based on the category from URL
      filteredProds = filteredProducts.filter(
        (product) => product.category.toLowerCase() === categoryFromUrl.toLowerCase()
      );
    } else {
      filteredProds = filteredProducts; // Reset to initial products if no filters
    }

    setSearchProd(filteredProds);
  }, [queryFromUrl, categoryFromUrl, filteredProducts]);

  return (
    <div className="search-results">
      <div className='search-results-product-item'>
        {searchProd.length > 0 ? (
          searchProd.map((item) => (  // Change from products to prod
            <Item 
              key={item.product_id} // Ensure you have a unique identifier in your product data
              product_id={item.product_id}
              title={item.title} // Adjust property names based on your API response
              main_image={item.main_image} // Adjust to match your API response
              new_price={item.new_price}
              old_price={item.old_price}
              discount={item.discount}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div> 
    </div>
  );
};

export default SearchProducts;
