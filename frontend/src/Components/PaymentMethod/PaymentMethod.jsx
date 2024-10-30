import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentMethod.css";

import bkashLogo from "../assets/bkash_logo.png";
import nagadLogo from "../assets/nagad_logo.png";
import rocketLogo from "../assets/rocket_logo.png";
import bankLogo from "../assets/bank_logo.jpg";
import cashLogo from "../assets/cash_logo.webp";
import mobile_banking_logo from "../assets/mobile_banking_logo.png";
import { GlobalContext } from "../../Context/GlobalContext";

const PaymentMethod = () => {
  const { cartItems, shippingAddress, updatePaymentMethod } =
    useContext(GlobalContext);

  const [paymentMethod, setPaymentMethod] = useState("Banking Method");
  const [mobileBankingDetails, setMobileBankingDetails] = useState({
    mobileBank: "",
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
  });
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentMethod === "Mobile Banking") {
      setMobileBankingDetails({ ...mobileBankingDetails, mobileBank: "bkash" });
    }
  }, [paymentMethod]);

  useEffect(() => {
    // Dismiss warning after 3 seconds if it is shown
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 3000); // 3 seconds

      // Clean up the timeout when the component is unmounted or warning is dismissed
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setMobileBankingDetails({ mobileBank: "" });
    setBankDetails({ bankName: "", accountNumber: "" });
  };

  const handleMobileBankingChange = (e) => {
    const { name, value } = e.target;
    setMobileBankingDetails({ ...mobileBankingDetails, [name]: value });
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();

    // Validation
    if (
      (paymentMethod === "Mobile Banking" && !mobileBankingDetails.mobileBank) ||
      (paymentMethod === "Banking Method" &&
        (!bankDetails.bankName || !bankDetails.accountNumber)) ||
      !paymentMethod
    ) {
      setShowWarning(true);  // Show warning if validation fails
      return;
    }

    updatePaymentMethod(paymentMethod);

    const order = {
      shippingAddress,
      paymentMethod,
      items: cartItems,
      totalAmount: totalAmount,
      mobileBankingDetails:
        paymentMethod === "Mobile Banking"
          ? {
              bank: mobileBankingDetails.mobileBank,
            }
          : null,
      bankDetails:
        paymentMethod === "Banking Method"
          ? { bankName: bankDetails.bankName, accountNumber: bankDetails.accountNumber }
          : null,
    };

    try {
      const response = await fetch("http://localhost:5002/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/order-confirmation");
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const totalAmount =
    cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0) +
    10;

  return (
    <div className="payment-container">
      {showWarning && (
        <div className="warning-message">
          Please select a payment method and fill all required fields!
        </div>
      )}

      <h2>Choose Payment Method</h2>

      <div className="payment-layout">
        <div className="payment-method-options">
          <label
            className={
              paymentMethod === "Banking Method" ? "active-method" : ""
            }
          >
            <input
              type="radio"
              value="Banking Method"
              checked={paymentMethod === "Banking Method"}
              onChange={handlePaymentMethodChange}
              required
            />
            <img src={bankLogo} alt="Banking Method" className="payment-icon" />
            Banking Method
          </label>
          <label
            className={
              paymentMethod === "Mobile Banking" ? "active-method" : ""
            }
          >
            <input
              type="radio"
              value="Mobile Banking"
              checked={paymentMethod === "Mobile Banking"}
              onChange={handlePaymentMethodChange}
              required
            />
            <img
              src={mobile_banking_logo}
              alt="Mobile Banking"
              className="payment-icon"
            />
            Mobile Banking
          </label>
          <label
            className={
              paymentMethod === "Cash on Delivery" ? "active-method" : ""
            }
          >
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={handlePaymentMethodChange}
              required
            />
            <img
              src={cashLogo}
              alt="Cash on Delivery"
              className="payment-icon"
            />
            Cash on Delivery
          </label>
        </div>

        <div className="payment-details">
          {paymentMethod === "Banking Method" && (
            <div className="bank-details-form">
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={bankDetails.bankName}
                onChange={handleBankDetailsChange}
                required
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                required
              />
            </div>
          )}
          {paymentMethod === "Mobile Banking" && (
            <div className="mobile-banking-form">
              <h4>Select Mobile Banking Method:</h4>
              <label
                className={
                  mobileBankingDetails.mobileBank === "bkash"
                    ? "active-method"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="mobileBank"
                  value="bkash"
                  onChange={handleMobileBankingChange}
                  required
                />
                <img src={bkashLogo} alt="bKash" className="mobile-logo" />
              </label>
              <label
                className={
                  mobileBankingDetails.mobileBank === "nagad"
                    ? "active-method"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="mobileBank"
                  value="nagad"
                  onChange={handleMobileBankingChange}
                  required
                />
                <img src={nagadLogo} alt="Nagad" className="mobile-logo" />
              </label>
              <label
                className={
                  mobileBankingDetails.mobileBank === "rocket"
                    ? "active-method"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="mobileBank"
                  value="rocket"
                  onChange={handleMobileBankingChange}
                  required
                />
                <img src={rocketLogo} alt="Rocket" className="mobile-logo" />
              </label>
            </div>
          )}

          {paymentMethod === "Cash on Delivery" && (
            <div className="cash-on-delivery-details">
              <p>
                Pay with cash when your order is delivered to your doorstep.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="total-amount">
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>

      <div className="place-order">
        <button onClick={handleSubmit}>Place Order</button>
      </div>
    </div>
  );
};

export default PaymentMethod;
