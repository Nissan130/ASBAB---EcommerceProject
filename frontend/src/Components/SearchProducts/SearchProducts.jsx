import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item"; // Assuming you have a component to render items
import "./SearchProducts.css";

const SearchProducts = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const queryFromUrl = searchParams.get("query"); // Get the query from URL parameters

  useEffect(() => {
    if (queryFromUrl) {
      // Fetch products based on the query from URL
      const fetchProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5002/searched-products?query=${queryFromUrl}`);
          if (!response.ok) {
            throw new Error("Failed to fetch searched products");
          }
          const data = await response.json();
          setProducts(data); // Store fetched products
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }
  }, [queryFromUrl]);

  return (
    <div className="search-results">
      <div className="search-results-product-item">
      {products.length > 0 ? (
        products.map((item) => (
          <Item
            key={item.product_id}
            product_id={item.product_id}
            title={item.title}
            main_image={item.main_image}
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
