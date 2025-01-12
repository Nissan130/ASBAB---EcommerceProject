import React from "react";
import "./Sidebar.css";
import { PiNotepadDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaListAlt, FaPlusCircle, FaPlusSquare, FaThList, FaUser, FaPlus,FaListUl} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">

<NavLink
        to="/product-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaListAlt />
        </div>
        <div className="sidebaritem">Product List</div>
      </NavLink>
      
      <NavLink
        to="/add-product"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaPlusCircle />
        </div>
        <div className="sidebaritem">Add Product</div>
      </NavLink>

     

      <NavLink
        to="/add-category"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaPlusSquare  />
        </div>
        <div className="sidebaritem">Add Category</div>
      </NavLink>

      <NavLink
        to="/category-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaListUl  />
        </div>
        <div className="sidebaritem">Category List</div>
      </NavLink>

      <NavLink
        to="/add-sub-category"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaPlus  />
        </div>
        <div className="sidebaritem">Add Sub-Category</div>
      </NavLink>

      <NavLink
        to="/sub-category-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaThList  />
        </div>
        <div className="sidebaritem">Sub-Category List</div>
      </NavLink>

      <NavLink
        to="/orders-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaUser  />
        </div>
        <div className="sidebaritem">Orders</div>
      </NavLink>

      <NavLink
        to="/users-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <FaUser  />
        </div>
        <div className="sidebaritem">Users</div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
