import React from 'react';
import './ProductDescriptionBox.css';

const ProductDescriptionBox = ({product}) => {
  // console.log(product.product_full_description);

  return (
    <div className="description-review-box">
      <div className="description-review-box-row">
        <p className="desc">Description</p>
        <p className="review">Reviews</p>
      </div>
      <div className="description-box">
        <p className="full-description">
          {product.product_full_description}
        </p>
      </div>
    </div>
  );
}

export default ProductDescriptionBox;
