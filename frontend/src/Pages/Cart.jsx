import React, { useContext, useEffect } from "react";
import { FaTrash } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import "./CSS/Cart.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const Cart = () => {
  const {
    cartItems,
    deleteFromCart,
    updateCartQuantity,
    showAddToCartMessage,
    showAddToCartAlert,
    setShowAddToCartAlert,
  } = useContext(GlobalContext); // Assuming updateCartQuantity is available
  const navigate = useNavigate();
  // console.log(updateCartQuantity);

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
    <div className="cart-container">
      {
        <div
          id="showDeleteCartAlert_snackbar"
          className={showAddToCartAlert ? "showDeleteCartAlert-Snackbar" : " "}
        >
          {showAddToCartMessage}
        </div>
      }
      {cartItems.length > 0 && (
        <div className="cart-title-container">
          <div className="product-image">Product</div>
          <div className="product-title">Product Title</div>
          <div className="product-price">Price</div>
          <div className="product-quantity">Quantity</div>
          <div className="product-total-price">Total Price</div>
          <div className="product-remove">Remove</div>
        </div>
      )}

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div className="cart-product-container" key={item.product_id}>
            <div className="cart-item cart-product-image">
              <img
                src={`http://localhost:5002/${item.main_image}`}
                alt={item.name}
              />
            </div>
            <div
              className="cart-item cart-product-title"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/product/${item.product_id}`);
              }}
            >
              {item.title}
            </div>
            <div className="cart-item cart-product-price">
              <TbCurrencyTaka />
              {Intl.NumberFormat('en-BD').format(item.new_price)}
            </div>
            <div className="cart-item cart-product-quantity">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  e.target.value;
                }}
              />
            </div>
            <div className="cart-item cart-product-total-price">
              <TbCurrencyTaka />
              {item.new_price * item.quantity}
            </div>
            <div className="cart-item cart-product-remove">
              <FaTrash onClick={() => deleteFromCart(item.product_id)} />
            </div>
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
          Your cart is empty
        </p>
      )}

      {cartItems.length > 0 && (
        <div className="update-cart-shopping">
          <div className="continue-shopping">
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
          <div className="update-cart">
            <button className="update-cart-btn">Update Cart </button>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-payment-container">
          <div className="cupon-container">
            <p style={{ fontWeight: "600" }}>
              If you have any coupon code, enter it here
            </p>
            <input type="text" placeholder="coupon code" />
          </div>

          <div className="checkout-section-container">
            <h2>Cart Totals</h2>
            <div className="subtotal">
              <div className="subtotal-title">Subtotal</div>
              <div className="subtotal-fee">
                <TbCurrencyTaka />
                {cartItems.reduce(
                  (acc, item) => acc + item.new_price * item.quantity,
                  0
                )}
              </div>
            </div>
            <hr />
            <div className="shipping">
              <div className="shipping-title">Shipping Fee</div>
              <div className="shipping-fee">
                <TbCurrencyTaka />
                10
              </div>
            </div>
            <hr />
            <div className="total">
              <div className="total-title">Total</div>
              <div className="total-fee">
                <TbCurrencyTaka />
                {cartItems.reduce(
                  (acc, item) => acc + item.new_price * item.quantity,
                  0
                ) + 10}
              </div>
            </div>
            <hr />
            <div className="checkout">
              <button
                onClick={() => {
                  navigate("/billing");
                  window.scrollTo(0, 0);
                }}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
