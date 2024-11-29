import React from "react";
import { NavLink, Route, Routes, useParams, Navigate } from "react-router-dom";
import ProductDescription from "../ProductDescription/ProductDescription";
import ProductReview from "../ProductReview/ProductReview";
import "./ProductDescriptionReview.css";

const ProductDescriptionReview = ({product}) => {
  const { productId } = useParams(); // Get dynamic product ID from URL

  return (
    <div className="description-review-container">
      {/* Navigation Links */}
      <div className="description-review-container-row">
        <p>
          <NavLink
            to={`/product/${productId}/product-description`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Description
          </NavLink>
        </p>
        <p>
          <NavLink
            to={`/product/${productId}/product-review`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Reviews
          </NavLink>
        </p>
      </div>

      {/* Dynamic Routes */}
      <div className="description-review-content">
        <Routes>
          {/* Default Redirect to Description */}
          <Route
            path="/"
            element={<Navigate to={`/product/${productId}/product-description`} replace />}
          />
          <Route
            path="product-description"
            element={<ProductDescription product={product} />}
          />
          <Route
            path="product-review"
            element={<ProductReview />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ProductDescriptionReview;
