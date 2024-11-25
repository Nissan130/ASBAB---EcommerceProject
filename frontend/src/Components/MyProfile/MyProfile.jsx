import React from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import './MyProfile.css';
import { FaCircleUser } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import PersonalInformation from "../PersonalInformation/PersonalInformation";
import OrderHistory from "../OrderHistory/OrderHistory";
import FavoritesProfile from "../FavoritesProfile/FavoritesProfile";
// import PaymentMethods from "../PaymentMethods/PaymentMethods";
// import SecuritySettings from "../SecuritySettings/SecuritySettings";

const MyProfile = () => {
  return (
    <div className="profile-container">
      {/* Sidebar Navigation */}
      <div className="profile-sidebar">
        <ul>
          <li>
            <NavLink
              to="/profile/personal-info"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaCircleUser style={{ color: "blue" }} /> Personal Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/order-history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaReceipt /> Order History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/payment-methods"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaCreditCard /> Payment Methods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaHeart style={{ color: "#ff4141" }} /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/security-settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaLock /> Security Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dynamic Content Rendering */}
      <div className="profile-content">
        <Routes>
          <Route path="/" element={<Navigate to="personal-info" replace />} />

          <Route path="personal-info" element={<PersonalInformation />} />
          <Route path="order-history" element={<OrderHistory />} />
          {/* <Route path="payment-methods" element={<PaymentMethods />} /> */}
          <Route path="favorites" element={<FavoritesProfile />} />
          {/* <Route path="security-settings" element={<SecuritySettings />} /> */}
          {/* <Route
            path="*"
            element={<h2>Please select an option from the sidebar.</h2>}
          /> */}
        </Routes>
      </div>
    </div>
  );
};

export default MyProfile;
