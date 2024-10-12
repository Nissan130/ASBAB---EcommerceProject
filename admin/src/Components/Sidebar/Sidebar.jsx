import React from "react";
import "./Sidebar.css";
import { PiNotepadDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

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
          <PiNotepadDuotone />
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
          <PiNotepadDuotone />
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
          <PiNotepadDuotone />
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
          <PiNotepadDuotone />
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
          <PiNotepadDuotone />
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
          <PiNotepadDuotone />
        </div>
        <div className="sidebaritem">Sub-Category List</div>
      </NavLink>

      <NavLink
        to="/users-list"
        className="sidebar-items"
        activeClassName="active"
        style={{ textDecoration: "none" }}
      >
        <div className="sidebaritem">
          <PiNotepadDuotone />
        </div>
        <div className="sidebaritem">Users</div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
