import React from 'react';
import { FaMedapps } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaDharmachakra } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";
import logo_img from '../Assets/asbab_logo.jpg';
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaAnglesUp } from "react-icons/fa6";
import visa_logo from '../Assets/visa_logo.png';
import dbbl_logo from '../Assets/dbbl_logo.jpeg';
import nagad_logo from '../Assets/nagad_logo.png';
import bkash_logo from '../Assets/bkash_logo.png';
import rocket_logo from '../Assets/rocket_logo.png';

import './Footer.css';
const Footer = () => {
    const handleGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className='footer-container'>
            {/* <div className="footer-features">
                <div className="feature-box">
                    <div><FaMedapps /></div>
                    <div>Fresh Products Every Day</div>
                </div>
                <div className="feature-box">
                    <div><FaTruck /></div>
                    <div>Free Delivery Over $50</div>
                </div>
                <div className="feature-box">
                    <div><FaDharmachakra /></div>
                    <div>Exclusive Daily Discounts</div>
                </div>
                <div className="feature-box">
                    <div><CiBadgeDollar /></div>
                    <div>Unbeatable Prices</div>
                </div>
            </div>
            <hr /> */}

            <div className="footer-main">
                <div className="footer-logo">
                    <img src={logo_img} alt="Website Logo" />
                    <p>This is an e-commerce website where you can buy a variety of products. For any inquiries, contact us through our social media channels.</p>
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
                        <li>Shipping Information</li>
                        <li>Return Policy</li>
                        <li>Track Your Order</li>
                        <li>FAQs</li>
                        <li>Contact Support</li>
                        <li>Product Recalls</li>
                    </ul>
                </div>
                <div className="aboutUs-box">
                    <div className="aboutUs-title">
                        <h3>ABOUT US</h3>
                    </div>
                    <ul>
                        <li>Our Story</li>
                        <li>Careers</li>
                        <li>Sustainability</li>
                        <li>Press Releases</li>
                    </ul>
                </div>
                <div className="contactUs-box">
                    <div className="contactUs-title">
                        <h3>HELP</h3>
                    </div>   
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Accessibility</li>
                        <li>Report an Issue</li>
                    </ul>
                </div>
            </div>
            <div className="footer-payment-methods">
                <h4>Payment Methods</h4>
                <img src={visa_logo} alt="Visa" />
                <img src={dbbl_logo} alt="DBBL" />
                <img src={nagad_logo} alt="Nagad" />
                <img src={rocket_logo} alt="Rocket" />
                <img src={bkash_logo} alt="bKash" />
            </div>

            <hr />
            <div className="copyright">
                <p>Copyright @ Designed By Nissan - 2024 | All Rights Reserved</p>
            </div>

            <div className="go-top-btn" onClick={handleGoToTop}>
                <FaAnglesUp />
            </div>
        </div>
    );
};

export default Footer;
