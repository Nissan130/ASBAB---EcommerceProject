import React from 'react'
import laptop1 from '../Assets/laptop_image1.jpeg'
import './Item.css'
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa"
import { BsCart3 } from "react-icons/bs"
import { Navigate, useNavigate } from 'react-router-dom';



const Item = (props) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    // navigate(`/product/${props.id}`); // Navigate to ProductDisplay page with the product id
    navigate(`/product/${props.id}`);
    window.scrollTo(0,0);
  };
  return (
    <div className='items-container' onClick={handleProductClick}>
        <div className="product-image-box">
           <img src={props.image} alt="" />
           
        </div>
        <div className="hover-wishlist-cart">
                  <div className="cartbox">
                    <BsCart3 />
                    <div className="item-tooltip-text">Add to Cart</div>
                  </div>
                  <div className="wishlist">
                    <FaRegHeart />
                    <div className="item-tooltip-text">Add to Favourite</div>
                  </div>
            </div>
        <div className="product-name">
            <p>{props.name}</p>
        </div>
        <div className="productprice-container">
            <div className="productprice-new_price"><TbCurrencyTaka />{props.new_price}
            </div>
            <div className="productprice-old_price"><TbCurrencyTaka />{props.old_price}</div>
        </div>

      
    </div>
  )
}

export default Item
