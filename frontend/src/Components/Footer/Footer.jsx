import React from 'react'
import { FaMedapps } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaDharmachakra } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";
import logo_img from '../Assets/ASBAB_logo.png'
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaAnglesUp } from "react-icons/fa6";
import visa_logo from '../Assets/visa_logo.png'
import dbbl_logo from '../Assets/dbbl_logo.jpeg'
import nagad_logo from '../Assets/nagad_logo.png'
import bkash_logo from '../Assets/bkash_logo.png'
import rocket_logo from '../Assets/rocket_logo.png'

import './Footer.css'
const Footer = () => {
    const handleGoToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

  return (
    <div className='footer-container'>
        <div className="footer-features">
            <div className="feature-box">
                <div><FaMedapps /></div>
                <div>Everyday Fresh Products</div>
            </div>
            <div className="feature-box">
                <div><FaTruck /></div>
                <div>Free delivery for order over</div>
            </div>
            <div className="feature-box">
                <div><FaDharmachakra /></div>
                <div>Daily Mega Discounts</div>
            </div>
            <div className="feature-box">
                <div><CiBadgeDollar /></div>
                <div>Best price on the market</div>
            </div>
        </div>
        <hr />

        <div className="footer-main">
            <div className="footer-logo">
                <img src={logo_img} alt="" />
                <p>This is a Ecommerce Website. Here you can buy any type of products. For any query, contact with us.</p>
                <div className="social-media-contact">
                    <div><FaFacebook /></div>
                    <div><IoLogoInstagram /></div>
                    <div><FaPinterest /></div>
                    <div><FaTwitter /></div>
                </div>
            </div>
            <div className="customer-service-box">
                <div className="customer-service-title">
                <h3>CUSTOMER SERVICE</h3>
                </div>        
                <ul>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                </ul>
            </div>
            <div className="aboutUs-box">
            <div className="aboutUs-title">
                <h3>ABOUT US</h3>
                </div>
                <ul>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                    <li>Shipping Policy</li>
                </ul>
            </div>
            <div className="contactUs-box">
                <div className="contactUs-title">
                <h3>HELP</h3>
                </div>   
                <ul>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>FAQs</li>
                </ul>
            </div>
        </div>
        <div className="footer-payment-methods">
            <h4>Payment methods </h4>
            <img src={visa_logo} alt="" />
            <img src={dbbl_logo} alt="" />
            <img src={nagad_logo} alt="" />
            <img src={rocket_logo} alt="" />
            <img src={bkash_logo} alt="" />
        </div>

        <hr />
        <div className="copyright">
            <p>Copyright @ Designed By Nissan - 2024 | All Right Reserved</p>
        </div>
      
        <div className="go-top-btn" onClick={handleGoToTop}>
           <FaAnglesUp />
        </div>
    </div>
  )
}

export default Footer
