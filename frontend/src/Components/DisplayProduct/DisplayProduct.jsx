import React from 'react';
import { useParams } from 'react-router-dom';
import all_product from '../Assets/all_product';
import './DisplayProduct.css';

const DisplayProduct = () => {
  const { id } = useParams();
  const product = all_product.find(item => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-display">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>New Price: ${product.new_price}</p>
      <p>Old Price: ${product.old_price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default DisplayProduct;
