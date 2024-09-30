import React, { useContext, useState } from "react";
import "./DisplayProduct.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both regular and filled heart icons
import { FaPlus, FaMinus } from "react-icons/fa6";
import { CartContext } from "../../Context/CartContext";
import other_images from "../Assets/other_images";

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
  const [mainImage, setMainImage] = useState(other_images);

  // Toggle favorite status
  const handleFavouriteClick = () => {
    addToFavourite(product);  // Call the function to add the product to the favorite list
    setIsFavourite(!isFavourite);  // Toggle the local favorite state
  };

  //handle dynamic ratings
  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <IoStar key={i} style={{ color: i <= rating ? "#ff4141" : "#ccc" }} />
  //     );
  //   }
  //   return stars;
  // };

  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-images">
           {/* <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />  */}
           {other_images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index}`}
              onMouseMove={() => setMainImage(img)} // Update main image on click
              className={mainImage === img ? "active-image" : ""}
            />
          ))}
        </div>
        <div className="product-image-main">
          <img src={product.image} alt="" />
          {/* <img src={mainImage} alt="" className="main-image"/> */}
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
