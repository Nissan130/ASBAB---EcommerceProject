import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Billing.css";

const Billing = () => {
  const { cartItems, userId } = useContext(GlobalContext);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    mobile_number: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("online"); // Default to "online"
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (
      !shippingAddress.name ||
      !shippingAddress.mobile_number ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      setShowWarning(true);
      return;
    }
  
    const orderData = {
      userId,
      shippingAddress,
      products: cartItems,
      totalAmount,
      totalQuantity,
    };
  
    if (paymentMethod === "online") {
      // Handle online payment
      fetch("http://localhost:5002/order", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((result) => {
          window.location.replace(result.url);
        })
        .catch((err) => {
          console.error("Payment initiation error:", err);
        });
    } else {
      // Navigate to ConfirmCashOnDelivery component
      window.scrollTo(0,0);
      navigate("/confirm-cash-on-delivery", { state: orderData });
    }
  };
  

  const totalAmount =
    cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0) + 10; // Add delivery charge if needed
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="billing-container">
      <h2>Billing Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="billing-details-container">
          <div className="billing-shipping-details">
            <h3>Shipping Address</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={shippingAddress.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="mobile_number"
              placeholder="Your Mobile Number"
              value={shippingAddress.mobile_number}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="billing-order-summary">
            <h3>Order Summary</h3>
            <div className="billing-order-summary-header">
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
            <div className="billing-order-total">
              <strong>Total:</strong>
              <TbCurrencyTaka />
              {totalAmount}
            </div>
          </div>
        </div>

        <div className="billing-payment-method">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={handlePaymentMethodChange}
            />
            Online Payment
          </label>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery
          </label>
        </div>

        <div className="billing-place-order">
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default Billing;
