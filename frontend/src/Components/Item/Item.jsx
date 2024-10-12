import React, { useContext } from 'react';
import './Item.css';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { GlobalContext } from '../../Context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Item = (props) => {
  const navigate = useNavigate();
  const { handleFavouriteClick } = useContext(GlobalContext);

  const handleProductClick = () => {
    // Navigate to ProductDisplay page with the product id
    navigate(`/product/${props.product_id}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className='items-container' onClick={handleProductClick}>
      <div className="product-image-box">
        {/* Update the src to point to the correct URL for the image */}
        <img src={`http://localhost:5002/${props.main_image}`} />
      </div>
      <div className="hover-wishlist-cart">
        <div className="cartbox">
          <BsCart3 />
          <div className="item-tooltip-text">Add to Cart</div>
        </div>
        <div className="wishlist" onClick={(e) => { e.stopPropagation(); handleFavouriteClick(props.product_id); }}>
          <FaRegHeart />
          <div className="item-tooltip-text">Add to Favourite</div>
        </div>
      </div>
      <div className="product-name">
        <p>{props.title}</p>
      </div>
      <div className="item-product-ratings">
        <div className="rating">4.2<IoStar /></div>
        <div className="offer"><span style={{ fontWeight: "600" }}>{props.discount}%</span> discount</div>
      </div>
      <div className="productprice-container">
        <div className="productprice-new_price"><TbCurrencyTaka />{props.new_price}</div>
        <div className="productprice-old_price"><TbCurrencyTaka />{props.old_price}</div>
      </div>
    </div>
  );
}

export default Item;
