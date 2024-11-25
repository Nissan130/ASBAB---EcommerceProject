import React, { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import "./FavoriteItems.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const FavoriteItems = () => {
  const { favoriteItems, addToCart } = useContext(GlobalContext);
  console.log(favoriteItems);
  const navigate = useNavigate();

  return (
    <div className="favorite-items-container">
      {favoriteItems.length > 0 && (
        <div className="fav-item-title-container">
          <div className="product-image">Product</div>
          <div className="product-title">Product Title</div>
          <div className="product-price">Price</div>
          <div className="product-addcart">Action</div>
          {/* <div className="product-remove">Remove</div> */}
        </div>
      )}

      {favoriteItems.length > 0 ? (
        favoriteItems.map((item) => (
          <div className="fav-item-product-container">
            <div className="fav-item fav-product-image">
              <img src={`http://localhost:5002/${item.main_image}`} />
            </div>
            <div
              className="fav-item fav-product-title"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/product/${item.product_id}`);
              }}
            >
              {item.title}
            </div>

            <div className="fav-item fav-product-price">
              <TbCurrencyTaka />
              {item.new_price}
            </div>
            <div className="fav-item fav-product-addToCart">
              <button type="button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
            {/* <div className="fav-item fav-product-remove">
                <IoMdClose />
            </div> */}
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "red",
            fontSize: "22px",
          }}
        >
          You have no favorite products
        </p>
      )}
    </div>
  );
};

export default FavoriteItems;
