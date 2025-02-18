import React, { useContext, useState, useRef, useEffect } from "react";
import "./DisplayProduct.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GlobalContext } from "../../Context/GlobalContext";
import DOMPurify from "dompurify";

const DisplayProduct = ({ product }) => {
  const {
    productCount,
    handleIncrementItem,
    handleDecrementItem,
    addToCart,
    addToFavorite,
    favoriteItems,
    showAddToCartAlert,
    setShowAddToCartAlert,
    showAddToCartMessage,
  } = useContext(GlobalContext);

  const [mainImage, setMainImage] = useState(product.main_image);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    setMainImage(product.main_image);
  }, [product]);

  const other_images = Array.isArray(product.other_images)
    ? product.other_images
    : JSON.parse(product.other_images || "[]");

    const safeHtml = DOMPurify.sanitize(product.product_short_description);

  const handleMouseMove = (e) => {
    const imageRect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - imageRect.left; // Get x position relative to the image
    const y = e.clientY - imageRect.top; // Get y position relative to the image

    // Set the zoom position 
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  //show product added to cart message
  useEffect(() => {
    if (showAddToCartAlert) {
      const timer = setTimeout(() => {
        setShowAddToCartAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAddToCartAlert, setShowAddToCartAlert]);

  return (
    <div className="product-display">
      {
        <div
          id="showAddToCartAlert_snackbar"
          className={showAddToCartAlert ? "showAddToCartAlert-Snackbar" : ""}
        >
          {showAddToCartMessage}
        </div>
      }
      <div className="product-display-left">
        <div className="product-images">
          <img
            src={`http://localhost:5002/${product.main_image}`}
            alt="Main"
            onClick={() => setMainImage(product.main_image)}
          />
          {other_images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5002/${image}`}
              alt={`Product ${index + 1}`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
        <div
          className="product-image-main"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={imageRef}
        >
          <img src={`http://localhost:5002/${mainImage}`} alt="" />
          {isZoomed && (
            <div
              className="zoom-lens"
              style={{
                left: `${zoomPosition.x - 50}px`, // Center lens on cursor
                top: `${zoomPosition.y - 50}px`, // Center lens on cursor
                backgroundImage: `url(http://localhost:5002/${mainImage})`,
                backgroundPosition: `-${zoomPosition.x * 2}px -${
                  zoomPosition.y * 2
                }px`, // Adjust zoom based on lens position
                backgroundSize: `${imageRef.current.offsetWidth * 2}px ${
                  imageRef.current.offsetHeight * 2
                }px`, // Change this for zoom level
              }}
            />
          )}
        </div>
      </div>

      <div className="product-display-right">
        <div className="product-name">
          <h2>{product.title}</h2>
        </div>
        <div className="product-ratings">
          <span>
            <IoStar />
          </span>
          <span>
            <IoStar />
          </span>
          <span>
            <IoStar />
          </span>
          <span>
            <IoStar />
          </span>
          <span className="fade-rating">
            <IoStar />
          </span>
          <span>(4.3)</span>
        </div>
        <div className="review-counts">(15 reviews)</div>
        <div className="product-prices">
          <div className="product-prices-new">
            <TbCurrencyTaka />
            {Intl.NumberFormat('en-BD').format(product.new_price)}
          </div>
          <div className="product-prices-old">
            <TbCurrencyTaka />
            {Intl.NumberFormat('en-BD').format(product.old_price)}
          </div>
          <div className="product-offers">{product.discount}% offers</div>
        </div>
        <div className="product-short-desc" dangerouslySetInnerHTML={{
          __html: safeHtml,
        }}>
          
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
            <span
              onClick={() => addToFavorite(product)}
              style={{ cursor: "pointer" }}
            >
              <FaHeart
                style={{
                  color: favoriteItems.some(
                    (item) => item.product_id === product.product_id
                  )
                    ? "red"
                    : "gray",
                fontSize:"22px",marginLeft:"10px", marginTop:"5px"}}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
