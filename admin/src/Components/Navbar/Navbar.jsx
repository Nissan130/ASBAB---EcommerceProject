import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/ASBAB_logo.png'
import nav_profile from '../../assets/laptop_image1.jpeg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={nav_logo} alt="" />
            <h2>ADMIN PANEL</h2>
        </div>
        <div className="nav-profile">
            <img src={nav_profile} alt="" />
        </div>
    </div>
  )
}

export default Navbar
