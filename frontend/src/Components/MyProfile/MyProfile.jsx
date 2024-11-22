import React, { useState } from "react";
import './MyProfile.css'
import { FaCircleUser } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import Favorites from "../Favorites/Favorites";
import OrderHistory from "../OrderHistory/OrderHistory";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const renderContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return <PersonalInformation />;
      case "orderHistory":
        return <OrderHistory />;
      // case "addresses":
      //   return <Addresses />;
      case "paymentMethods":
        return <PaymentMethods />;
      case "favorites":
        return <Favorites />;
      case "securitySettings":
        return <SecuritySettings />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <ul>
          <li
            className={activeTab === "personalInfo" ? "active" : ""}
            onClick={() => setActiveTab("personalInfo")}
          >
            <FaCircleUser style={{color:'blue'}} /> Personal Information
          </li>
          <li
            className={activeTab === "orderHistory" ? "active" : ""}
            onClick={() => setActiveTab("orderHistory")}
          >
            <FaReceipt /> Order History
          </li>
          {/* <li
            className={activeTab === "addresses" ? "active" : ""}
            onClick={() => setActiveTab("addresses")}
          >
            <FaMapMarkerAlt /> Addresses
          </li> */}
          <li
            className={activeTab === "paymentMethods" ? "active" : ""}
            onClick={() => setActiveTab("paymentMethods")}
          >
            <FaCreditCard /> Payment Methods
          </li>
          <li
            className={activeTab === "favorites" ? "active" : ""}
            onClick={() => setActiveTab("favorites")}
          >
            <FaHeart style={{color:'#ff4141'}} /> Favorites
          </li>
          <li
            className={activeTab === "securitySettings" ? "active" : ""}
            onClick={() => setActiveTab("securitySettings")}
          >
            <FaLock /> Security Settings
          </li>
        </ul>
      </div>

      <div className="profile-content">{renderContent()}</div>
    </div>
  );
};



// const OrderHistory = () => (
//   <div>
//     <h2>Order History</h2>
//     {/* Display the list of orders */}
//   </div>
// );

const Addresses = () => (
  <div>
    <h2>Saved Addresses</h2>
    {/* Display and manage saved addresses */}
  </div>
);

const PaymentMethods = () => (
  <div>
    <h2>Payment Methods</h2>
    {/* Manage payment methods */}
  </div>
);

const Wishlist = () => (
  <div>
    <h2>Wishlist</h2>
    {/* Display user's saved wishlist items */}
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2>Security Settings</h2>
    {/* Change password or other security settings */}
  </div>
);

export default MyProfile;
