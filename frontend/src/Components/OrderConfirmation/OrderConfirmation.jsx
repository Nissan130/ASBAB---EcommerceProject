import React, { useContext } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { GlobalContext } from "../../Context/GlobalContext";

const OrderConfirmation = () => {
  const { cartItems, shippingAddress, paymentMethod } = useContext(GlobalContext);
  
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.new_price * item.quantity,
    0
  ) + 10;

  return (
    <div className="OrderConfirmation-container">
      <h2>Thank You for Your Order!</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="order-summary-header">
          <span>Product</span>
          <span>Qty</span>
          <span>Subtotal</span>
        </div>
        {cartItems.map((item) => (
          <div key={item.product_id} className="order-item">
            <span className="product-title">{item.title}</span>
            <span>{item.quantity}</span>
            <span>
              <TbCurrencyTaka />
              {item.new_price * item.quantity}
            </span>
          </div>
        ))}
        <div className="order-total">
          <strong>Total:</strong>
          <TbCurrencyTaka />
          {totalAmount}
        </div>
      </div>

      <div className="shipping-details">
        <h3>Shipping Address</h3>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>{shippingAddress.city}</p>
        <p>{shippingAddress.postalCode}</p>
        <p>{shippingAddress.country}</p>
      </div>

      <div className="payment-method">
        <h3>Payment Method</h3>
        <p>{paymentMethod}</p>
      </div>

      <div className="back-home">
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default OrderConfirmation;
