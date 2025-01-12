import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmCashOnDelivery.css";

const ConfirmCashOnDelivery = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // Redirect back to billing page if no state data is found
    navigate("/billing");
    return null;
  }

  const { shippingAddress, products, totalAmount, totalQuantity, userId } = state;

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("http://localhost:5002/cash-on-delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, shippingAddress, products, totalAmount, totalQuantity }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to place order.");
      }
  
      const result = await response.json();
      if (result.success && result.redirectURL) {
        alert("Your order has been placed successfully!");
  
        // Navigate to the order-history page
        navigate(result.redirectURL);
  
        // Refresh the page after navigation
        setTimeout(() => {
          window.location.reload();
          window.scrollTo(0,0);
        }, 500); // Delay to allow navigation to complete
      } else {
        throw new Error(result.error || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  };
  

  const handleCancel = () => {
    window.scrollTo(0, 0);
    navigate("/billing");
  };

  return (
    <div className="confirm-cod-container">
      <h2>Confirm Your Order</h2>
      <div className="billing-details">
        <h3>Billing Details</h3>
        <p><strong>Name:</strong> {shippingAddress.name}</p>
        <p><strong>Mobile Number:</strong> {shippingAddress.mobile_number}</p>
        <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
        <p><strong>Payment Method:</strong> Cash On Delivery. <span style={{color:"red"}}>Pay with cash when your order is delivered to your doorstep.</span></p>
      </div>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Total Products:</strong> {totalQuantity}</p>
        <p><strong>Total Amount:</strong> ৳{totalAmount}</p>
        <div className="order-items">
          <h4>Products:</h4>
          {products.map((item) => (
            <p key={item.product_id}>
              {item.title} (x{item.quantity}) - ৳{item.new_price * item.quantity}
            </p>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="btn btn-place-order" onClick={handlePlaceOrder}>
          Confirm Order
        </button>
        <button className="btn btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmCashOnDelivery;
