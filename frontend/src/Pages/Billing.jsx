import React, { useContext, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Billing.css";

const Billing = () => {
  const { cartItems, userId } = useContext(GlobalContext);
  // console.log(cartItems);
  

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

    // updateShippingAddress(shippingAddress);
    // navigate("/payment");

    const orderData = {
      userId,
      shippingAddress,
      products: cartItems.map((item) => ({
        product_id: item.product_id,
        title: item.title,
        quantity: item.quantity,
      })),
      totalAmount, // Add totalAmount to the order data.
      totalQuantity,
    };

    fetch("http://localhost:5002/order", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(orderData),
    })
    .then((res)=>res.json())
    .then((result)=>{
      window.location.replace(result.url);
      // console.log(result);
    });
    // console.log(orderData);
  };
  console.log("user id: ", userId);


 
 
  

  const totalAmount = cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0) + 10; // Add delivery charge if needed
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0); 
  // console.log("Total quantity: ",totalQuantity);
  
  // console.log(shippingAddress);
  

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
        <div className="billing-place-order">
          <button type="submit">Continue to Payment</button>
        </div>
      </form>
    </div>
  );
};

export default Billing;