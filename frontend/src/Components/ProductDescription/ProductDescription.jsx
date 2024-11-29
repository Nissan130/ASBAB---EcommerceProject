import React from "react";
import "./ProductDescription.css";
import DOMPurify from "dompurify";

const ProductDescription = ({ product }) => {
  const safeHtml = DOMPurify.sanitize(product.product_full_description);
  return (
    <div className="product-full-description-container">
      {/* <p>Product Descrition</p> */}

      <div className="product-full-desc" dangerouslySetInnerHTML={{
          __html:safeHtml,
        }}>
          
        </div>

    </div>
  );
};

export default ProductDescription;
