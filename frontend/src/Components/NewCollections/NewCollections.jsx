import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Filter products to get only the ones from the last 15 days
        const today = new Date();
        const fifteenDaysAgo = new Date(today);
        fifteenDaysAgo.setDate(today.getDate() - 15);

        const recentProducts = data.filter((product) => {
          const productDate = new Date(product.created_at); // Adjust field name as per your data structure
          return productDate >= fifteenDaysAgo;
        });

        setNewCollections(recentProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  // Only render if there are recent products within the last 15 days
  if (newCollections.length === 0) {
    return null; // Return null if there are no new products to display
  }

  return (
    <div className='newCollections-product'>
      <div className="newCollections-product-title">
        <h2>NEW COLLECTIONS</h2>
      </div>
      <div className="newCollections-product-item">
        {newCollections.map((item) => (
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
    </div>
  );
}

export default NewCollections;
