import React, { useContext, useState } from "react";
import "./DisplayProduct.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both regular and filled heart icons
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CartContext } from "../../Context/CartContext";

const DisplayProduct = ({ product }) => {
  const {
    productCount,
    handleIncrementItem,
    handleDecrementItem,
    addToCart,
    addToFavourite,
  } = useContext(CartContext);

  // State to track if the product is in the favorites
  const [isFavourite, setIsFavourite] = useState(false);

  // Toggle favorite status
  const handleFavouriteClick = () => {
    addToFavourite(product);  // Call the function to add the product to the favorite list
    setIsFavourite(!isFavourite);  // Toggle the local favorite state
  };

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
            <button onClick={handleDecrementItem} className="minus">
              <FaMinus />
            </button>
            <button>{productCount}</button>
            <button onClick={handleIncrementItem} className="plus">
              <FaPlus />
            </button>
          </div>
          <div className="addCart-wislist-btn">
            <button onClick={() => addToCart(product)}>ADD TO CART</button>

            {/* Conditionally render the heart icon based on whether the product is in favorites */}
            <span onClick={handleFavouriteClick}>
              {isFavourite ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
