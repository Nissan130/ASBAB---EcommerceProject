import React, { useContext, useState, useRef, useEffect } from "react";
import "./DisplayProduct.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GlobalContext } from "../../Context/GlobalContext";

const DisplayProduct = ({ product }) => {
  const {
    productCount,
    handleIncrementItem,
    handleDecrementItem,
    addToCart,
    addToFavourite,
  } = useContext(GlobalContext);

  const [isFavourite, setIsFavourite] = useState(false);
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

  const handleFavouriteClick = () => {
    addToFavourite(product);
    setIsFavourite(!isFavourite);
  };

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

  return (
    <div className="product-display">
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
                backgroundPosition: `-${zoomPosition.x * 2}px -${zoomPosition.y * 2}px`, // Adjust zoom based on lens position
                backgroundSize: `${imageRef.current.offsetWidth * 2}px ${imageRef.current.offsetHeight * 2}px`, // Change this for zoom level
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
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span className="fade-rating"><IoStar /></span>
          <span>(4.3)</span>
        </div>
        <div className="review-counts">(15 reviews)</div>
        <div className="product-prices">
          <div className="product-prices-new">
            <TbCurrencyTaka />
            {product.new_price}
          </div>
          <div className="product-prices-old">
            <TbCurrencyTaka />
            {product.old_price}
          </div>
          <div className="product-offers">{product.discount}% offer</div>
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
            <span onClick={handleFavouriteClick}>
              {isFavourite ? <FaHeart style={{ color: 'red', fontSize:'22px'}} /> : <FaRegHeart style={{fontSize:'22px'}} />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
