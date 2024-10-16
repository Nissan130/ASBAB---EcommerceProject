import React, { useContext, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Billing.css";

const Billing = () => {
  const { cartItems, updateShippingAddress } = useContext(GlobalContext);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setShowWarning(true);
      return;
    }

    updateShippingAddress(shippingAddress);
    navigate("/payment");
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0) + 10; // Add delivery charge if needed

  return (
    <div className="billing-container">
      <h2>Billing Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="billing-details-container">
          <div className="shipping-details">
            <h3>Shipping Address</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingAddress.name}
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
        </div>
        <div className="place-order">
          <button type="submit">Continue to Payment</button>
        </div>
      </form>
    </div>
  );
};

export default Billing;
