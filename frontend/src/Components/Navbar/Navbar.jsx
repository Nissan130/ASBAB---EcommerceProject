import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import asbab_logo from "../Assets/ASBAB_logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";
import { RiMenuAddLine, RiArrowRightSLine } from "react-icons/ri";
import { CartContext } from "../../Context/CartContext";
import all_product from "../Assets/all_product";

const Navbar = ({ setFilteredProducts }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0); // For keyboard navigation
  const searchInputRef = useRef(null); // Reference to search input for detecting outside clicks
  const navigate = useNavigate();
  const { cartItems, favouriteCount } = useContext(CartContext);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const navFirst = document.querySelector(".nav-first");
      const navTop = navFirst.offsetTop;
      if (window.scrollY > navTop) {
        navFirst.classList.add('scroll-active');
        setIsFixed(true);
      } else {
        navFirst.classList.remove('scroll-active');
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Debounce function to delay the execution of search filtering
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Only update the search results with a debounce delay
  const handleSearchFilter = (value) => {
    if (value.trim()) {
      const filteredCats = [...new Set(
        all_product
          .filter((product) => product.category.toLowerCase().includes(value.toLowerCase()))
          .map((product) => product.category)
      )];
      setFilteredCategories(filteredCats);
      setActiveSuggestionIndex(0); // Reset active suggestion index
    } else {
      setFilteredCategories([]);
    }
  };

  const debouncedHandleSearchFilter = debounce(handleSearchFilter, 300);

  // Update search term immediately, but filter the results with debounce
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue); // Update input field in real-time
    debouncedHandleSearchFilter(searchValue); // Filter search results after debounce
  };

  const handleSearchSubmit = () => {
    const filteredProds = all_product.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProds);
    setFilteredCategories([]);
    navigate(`/search-products?query=${searchTerm}`);
  };

  const handleSuggestionClick = (category) => {
    setSearchTerm(category);
    const filteredProds = all_product.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filteredProds);
    setFilteredCategories([]);
    navigate(`/search-products?category=${category}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredCategories.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === "Enter") {
      if (filteredCategories.length > 0) {
        handleSuggestionClick(filteredCategories[activeSuggestionIndex]);
      }
    }
  };

  const handleCartClick = () => {
    setSearchTerm(""); // Clear search input when clicking Cart
    navigate("/cart");
    window.scrollTo(0, 0);
  };

  const handleOutsideClick = (e) => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
      setFilteredCategories([]); // Hide suggestions when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar-main">
      <div className={`nav-first ${isFixed ? "nav-first-fixed" : ""}`}>
        <div className="nav-logo" onClick={() => { setSearchTerm(""); navigate("/"); }}>
          <img src={asbab_logo} alt="logo" />
        </div>
        <div className="search-bar" ref={searchInputRef}>
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="search-input-field"
          />
          <button onClick={handleSearchSubmit} className="search-btn">
            <FiSearch />
          </button>

          {searchTerm && filteredCategories.length > 0 && (
            <ul className="search-suggestions">
              {filteredCategories.map((category, index) => (
  <li
    key={index}
    onClick={() => handleSuggestionClick(category)}
    className={`suggestions-list ${index === activeSuggestionIndex ? "active" : ""}`}
  >
    {/* <img src={product?.imageUrl} alt={product?.name} style={{ width: "30px", height: "30px", marginRight: "10px" }} /> */}
    {category}
  </li>
))}
            </ul>
          )}
        </div>

        <div className="login-cart-wishlist-container">
          <div
            className="wishlist-container"
            onClick={() => navigate("/wishlist")}
          >
            <FaRegHeart /> <span>{favouriteCount}</span>
            <div className="navbar-tooltip-text">Favourite</div>
          </div>

          {/* =======design cart container ====== */}
          <div className="nav-cart-container" onClick={handleCartClick}>
            <BsCart3 /> <span>{totalCartQuantity}</span>
            <div className="navbar-tooltip-text">Cart</div>
          </div>
          <div
            className="loginSignup-container"
            onClick={() => navigate("/signin")}
          >
            <button className="signin-btn">Sign In</button>
          </div>
        </div>
      </div>

      {/* === nav second start === */}
      {/* <div className={`nav-second ${isFixed ? 'nav-second-fixed' : ''}`}> */}
      <div className={`nav-second ${isFixed ? "nav-second-fixed" : ""}`}>
        <ul className="category-navbar">
          <li className="category-hover-list">
            All Categories <RiMenuAddLine />
            <ul className="category-hover-list-items">
              <li className="newCollection-side-list category-link">
                <div className="category-link-item">New Collections</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
                <ul>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Womens</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Kids</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                </ul>
              </li>
              <li className="popularProducts-side-list category-link">
                <div className="category-link-item">Popular Products</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
                <ul>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <RiArrowRightSLine />
                    </div>
                  </li>
                </ul>
              </li>
              <li className="category-link">
                <div className="category-link-item">Computer Assets</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Mens Collections</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Womens Collections</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Kids Collections</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
            </ul>
          </li>

          <li
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            HOME
          </li>

          {/* ======design fashion category ======= */}
          <li className="fashion-category category-link">
            <div className="category-link-item">FASHION</div>
            <div className="category-right-arrow">
              <IoChevronDownSharp />
            </div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Men</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Women</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Boys</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Girls</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Kids</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
            </ul>
          </li>

          {/* ======design footwear category ======= */}
          <li className="footwear-category category-link">
            <div className="category-link-item">FOOTWEAR</div>
            <div className="category-right-arrow">
              <IoChevronDownSharp />
            </div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Mens Footwear</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Womens Footwear</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Kids Footwear</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
            </ul>
          </li>

          {/* ======design electronics category ======= */}
          <li className="electronics-category category-link">
            <div className="category-link-item">ELECTRONICS</div>
            <div className="category-right-arrow">
              <IoChevronDownSharp />
            </div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Mobile</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">laptop</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Watches</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">TV</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Refrigerator</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Computer Accesories</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
            </ul>
          </li>
          {/* ======design groceries category ======= */}
          <li className="groceries-category category-link">
            <div className="category-link-item">GROCERIES</div>
            <div className="category-right-arrow">
              <IoChevronDownSharp />
            </div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Cooking</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Home Care</div>
                <div className="category-right-arrow">
                  <RiArrowRightSLine />
                </div>
              </li>
            </ul>
          </li>
          <li>BAGS</li>
          <li>JUWELLARY</li>
          <li>WELLNESS</li>
        </ul>
      </div>
      {/* === nav second end === */}

    </div>
  );
};

export default Navbar;
