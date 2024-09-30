import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchProducts.css';
import Item from '../Item/Item';

const SearchProducts = ({ filteredProducts = [] }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(filteredProducts);

  const queryFromUrl = searchParams.get('query');
  const categoryFromUrl = searchParams.get('category');

  useEffect(() => {
    let filteredProds;

    if (queryFromUrl) {
      // Filter products based on the search term from URL
      filteredProds = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
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

    setProducts(filteredProds);
  }, [queryFromUrl, categoryFromUrl, filteredProducts]);

  return (
    <div className="search-results">
      <div className='search-results-product-item'>
        {products.length > 0 ? (
          products.map((product) => (
            <Item
              key={product.id} // Use product.id as the key
              id={product.id}
              name={product.name}
              image={product.image}
              new_price={product.new_price}
              old_price={product.old_price}
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
