import React from "react";
import "./DisplayProduct.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const DisplayProduct = ({ product }) => {
  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-images">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-image-main">
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="product-display-right">
        <div className="product-name">
          <h2>{product.name}</h2>
        </div>
        <div className="product-ratings">
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span className="fade-rating"><IoStar /></span>
          <span>(4.3)</span>
        </div>
        <div className="review-counts">
            (15 reviews)
          </div>
        <div className="product-prices">
          <div className="product-prices-new">
            <TbCurrencyTaka />
            {product.new_price}
          </div>
          <div className="product-prices-old">
            <TbCurrencyTaka />
            {product.old_price}
          </div>
          <div className="product-offers">20% offer</div>
        </div>
        <div className="product-short-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita exercitationem placeat laborum quae sunt nemo numquam repudiandae doloribus accusantium temporibus?
        </div>
        <div className="products-btns">
          <div className="increase-decrease-item">
            <button className="minus"><FaMinus /></button>
            <button>2</button>
            <button className="plus"><FaPlus /></button>
          </div>
          <div className="addCart-wislist-btn">
            <button>ADD TO CART</button>
              <FaRegHeart />
          </div>
          .
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
