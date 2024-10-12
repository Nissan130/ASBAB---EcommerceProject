import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import "./CSS/Cart.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";

const Cart = () => {
  const { cartItems, deleteFromCart, updateCartQuantity } = useContext(GlobalContext); // Assuming updateCartQuantity is available
  const navigate = useNavigate();

  return (
    <div className="cart-container">
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
              <img  src={`http://localhost:5002/${item.main_image}`} alt={item.name} />
            </div>
            <div className="cart-item cart-product-title">{item.title}</div>
            <div className="cart-item cart-product-price">
              <TbCurrencyTaka />
              {item.new_price}
            </div>
            <div className="cart-item cart-product-quantity">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))} // Update the quantity
                min="1"
              />
            </div>
            <div className="cart-item cart-product-total-price">
              <TbCurrencyTaka />
              {item.new_price * item.quantity}
            </div>
            <div className="cart-item cart-product-remove">
              <RiDeleteBin6Line onClick={() => deleteFromCart(item.product_id)} />
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
            <button onClick={() => navigate("/")}>Continue Shopping</button>
          </div>
          <div className="update-cart">
            <button>Update Cart</button>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-payment-container">
          <div className="cupon-container">
            <p>If you have any coupon code, enter it here</p>
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
                <TbCurrencyTaka />10
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
              <button onClick={()=>{
                navigate('/billing');
                window.scrollTo(0,0);
                }}>Proceed To Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
