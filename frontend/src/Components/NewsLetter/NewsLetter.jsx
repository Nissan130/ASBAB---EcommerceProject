import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      <div className="newsletter-headtitle">
        Get Exclusive Offers on Your Email
      </div>
      <div className="newsletter">
        <div className="newsletter-left">
          <p>Sign Up for Newsletters</p>
          <p>
            Join our email subscription now to get updates on promotions and
            coupons.
          </p>
        </div>
        <div className="newsletter-right">
                <input type="email" placeholder="Your Email Address" />
                <button>SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
