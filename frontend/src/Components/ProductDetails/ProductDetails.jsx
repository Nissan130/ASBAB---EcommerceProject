import React from "react";
import './ProductDetails.css'
import DisplayProduct from "../DisplayProduct/DisplayProduct";
import Breadcrums from "../Breadcrums/Breadcrums";
import { useParams } from "react-router-dom";
import all_product from "../Assets/all_product";
import ProductDescriptionBox from "../ProductDescriptionBox/ProductDescriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import NewsLetter from '../NewsLetter/NewsLetter'

const ProductDetails = () => {
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === parseInt(productId));

  return (
    <div className="product-details">
      <Breadcrums product={product} />
      <DisplayProduct product={product}/>
      <ProductDescriptionBox />
      <RelatedProducts />
      <NewsLetter />
    </div>
  );
};

export default ProductDetails;
