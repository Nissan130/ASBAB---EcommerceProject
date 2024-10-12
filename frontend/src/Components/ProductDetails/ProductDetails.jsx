import React, { useContext, useEffect, useState } from "react";
import './ProductDetails.css';
import DisplayProduct from "../DisplayProduct/DisplayProduct";
import Breadcrums from "../Breadcrums/Breadcrums";
import { useParams } from "react-router-dom";
import ProductDescriptionBox from "../ProductDescriptionBox/ProductDescriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import NewsLetter from '../NewsLetter/NewsLetter';
import { GlobalContext } from "../../Context/GlobalContext";

const ProductDetails = () => {
  const { products } = useContext(GlobalContext); 
  
  
  const { productId } = useParams();

  // Ensure products is loaded before calling find
  const product = products.find((e) => e.product_id === parseInt(productId));
  // console.log(product);
  // Handle the case where the product is not found or still loading
  if (!product) {
    return <div>Loading product details...</div>; // Or show a 404 error message
  }

  return (
    <div className="product-details">
      <Breadcrums product={product} />
      <DisplayProduct product={product} />
      <ProductDescriptionBox />
      <RelatedProducts />
      <NewsLetter />
    </div>
  );
};

export default ProductDetails;
