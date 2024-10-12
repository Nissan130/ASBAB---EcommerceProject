import React from "react";
import './MyProfile.css';
import { useNavigate } from "react-router-dom";

const MyProfile = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    onClose();
  };
  const handleViewProfile= () =>{
    navigate("/profile");
    onClose();  // close the dropdown
  }

  return (
    <div>
     
    </div>
  );
};

export default MyProfile;

