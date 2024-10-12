import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios"; // For making API requests

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to hold product list

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/products"); // Call to backend API
        setProducts(response.data); // Store products in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="product-list">
        {/* Table Headers */}
        <div className="productlist-title-container">
          <div className="sl-no">SL</div>
          <div className="productlist-image">Image</div>
          <div className="productlist-title">Product Title</div>
          <div className="productlist-new_price">New Price</div>
          <div className="productlist-old_price">Old Price</div>
          <div className="productlist-category">Category</div>
          <div className="productlist-edit">Edit</div>
          <div className="productlist-remove">Remove</div>
        </div>

        {/* Dynamically render the product list */}
        {products.map((product, index) => (
          <div key={product.id} className="productlist-product-container">
            <div className="productlist-item">{index + 1}</div>
            <div className="productlist-item productlist-image-item">
              <img src={`http://localhost:5002/${product.main_image}`} alt={product.title} className="product-image" />
            </div>
            <div className="productlist-item productlist-title-item">{product.title}</div>
            <div className="productlist-item">${product.new_price}</div>
            <div className="productlist-item">${product.old_price}</div>
            <div className="productlist-item">{product.category}</div>
            <div className="productlist-item productlist-edit-item">
              <FaEdit />
            </div>
            <div className="productlist-item productlist-remove-item">
              <AiOutlineDelete />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
