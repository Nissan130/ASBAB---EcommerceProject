import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import asbab_logo from '../Assets/ASBAB_logo.png'
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa"
import { BsCart3 } from "react-icons/bs"
import { IoChevronDownSharp } from "react-icons/io5"
import { RiMenuAddLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

const Navbar = () => {
    const [isFixed, setIsFixed] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const handleScroll = () => {
            const navSecond = document.querySelector('.nav-second');
            const navTop = navSecond.offsetTop;

            if(window.scrollY > navTop) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll' , handleScroll);
        return () =>{
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className='navbar-main'>
        {/* === nav first start === */}
        <div className="nav-first">
            <div className="nav-logo" onClick={() => navigate('/')}>
                <img src={asbab_logo} alt="" />
            </div>
            <div className="search-bar">
                <input type="text" placeholder='Search products' />
                <button><FiSearch /></button>
            </div>

            <div className="login-cart-wishlist-container">
            <div className="wishlist-container" onClick={()=> navigate('/wishlist')}>
               <FaRegHeart /> <span>0</span>
               <div className="tooltip-text">Wishlist</div>
            </div>
            <div className="cart-container" onClick={()=> navigate('/cart')}>
               <BsCart3 /> <span>0</span>
               <div className="tooltip-text">Cart</div>
            </div>
            <div className="loginSignup-container" onClick={()=> navigate('/signin')}>
                    <button>Sign In</button>
            </div>
            </div>
            
        </div>
        {/* === nav first end === */}

        {/* === nav second start === */}
        <div className={`nav-second ${isFixed? 'nav-second-fixed' : ''}`}>
            <ul className="category-navbar">
                <li className='category-hover-list'>All Categories <RiMenuAddLine />
                    <ul className='category-hover-list-items'>
                            <li className='newCollection-side-list'>New Collections <span><RiArrowRightSLine /></span>
                                 <ul>
                                    <li>Mens <span><RiArrowRightSLine /></span>     
                                    </li>
                                    <li>Womens <span><RiArrowRightSLine /></span></li>
                                    <li>Kids <span><RiArrowRightSLine /></span></li>
                                </ul>
                            </li>
                            <li className='popularProducts-side-list'>Popular Products <span><RiArrowRightSLine /></span>
                                <ul>
                                        <li>Mens <span><RiArrowRightSLine /></span>     
                                        </li>
                                        <li>Womens <span><RiArrowRightSLine /></span></li>
                                        <li>Kids <span><RiArrowRightSLine /></span></li>
                                 </ul>
                            </li>
                            <li>Computer Assets <span><RiArrowRightSLine /></span></li>
                            <li>Mens Collections <span><RiArrowRightSLine /></span></li>
                            <li>Womens Collections <span><RiArrowRightSLine /></span></li>
                            <li>Kids Collections <span><RiArrowRightSLine /></span></li>
                     </ul>
                </li>           

                <li onClick={() => {navigate('/'); window.scrollTo(0,0)}}>HOME</li>
                <li>FASHION <span><IoChevronDownSharp /></span></li>
                <li>ELECTRONICS <span><IoChevronDownSharp /></span></li>
                <li>GROCERIES <span><IoChevronDownSharp /></span></li>
                <li>FOOTWEAR <span><IoChevronDownSharp /></span></li>
                <li>BEAUTY</li>
                <li>WELLNESS</li>
                <li>JUWELLARY</li>
            </ul>
        </div>
        {/* === nav second end === */}
       
    </div>
  )
}

export default Navbar
