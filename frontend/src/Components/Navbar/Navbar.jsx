import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import asbab_logo from "../Assets/ASBAB_logo.png";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";
import { RiMenuAddLine, RiArrowRightSLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { GlobalContext } from "../../Context/GlobalContext";

const Navbar = ({ setFilteredProducts }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0); // For keyboard navigation
  const searchInputRef = useRef(null); // Reference to search input for detecting outside clicks
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null); // Ref for the profile dropdown
  const navigate = useNavigate();

  const { products, cartItems, favouriteCount,logoutUser} = useContext(GlobalContext);

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowProfileDropdown(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewProfile = () => {
    navigate("/profile"); // Safe to use after Router initialization
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    logoutUser();
    setShowProfileDropdown(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const navFirst = document.querySelector(".nav-first");
      const navTop = navFirst.offsetTop;
      if (window.scrollY > navTop) {
        navFirst.classList.add("scroll-active");
        setIsFixed(true);
      } else {
        navFirst.classList.remove("scroll-active");
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
      const filteredCats = [
        ...new Set(
          products
            .filter((product) =>
              product.category.toLowerCase().includes(value.toLowerCase())
            )
            .map((product) => product.category)
        ),
      ];
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
    const filteredProds = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProds);
    setFilteredCategories([]);
    navigate(`/search-products?query=${searchTerm}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const handleSuggestionClick = (category) => {
    setSearchTerm(category);
    const filteredProds = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filteredProds);
    setFilteredCategories([]);
    navigate(`/search-products?category=${category}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
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
        <div
          className="nav-logo"
          onClick={() => {
            setSearchTerm("");
            navigate("/");
          }}
        >
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
                  className={`suggestions-list ${
                    index === activeSuggestionIndex ? "active" : ""
                  }`}
                >
                  {/* <img src={product?.imageUrl} alt={product?.name} style={{ width: "30px", height: "30px", marginRight: "10px" }} /> */}
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* start login-cart-wishlist-container */}
        <div className="login-cart-wishlist-container">
          {/* Wishlist */}
          <div
            className="wishlist-container"
            onClick={() => navigate("/wishlist")}
          >
            <FaRegHeart /> <span>{favouriteCount}</span>
            <div className="navbar-tooltip-text">Favourite</div>
          </div>

          {/* Cart */}
          <div className="nav-cart-container" onClick={() => navigate("/cart")}>
            <BsCart3 /> <span>{totalCartQuantity}</span>
            <div className="navbar-tooltip-text">Cart</div>
          </div>

          {/* Profile / Login Button */}
          <div className="nav-loginSignup">
            {localStorage.getItem("userToken") ? (
              <>
                <button className="signin-btn" onClick={toggleProfileDropdown}>
                  My Profile
                </button>
                {showProfileDropdown && (
                  // <MyProfile onClose={() => setShowProfileDropdown(false)} />
                  <div className="profile-dropdown" ref={dropdownRef}>
                    <ul>
                      <li onClick={handleViewProfile}>
                        <span>
                          <FaCircleUser />
                        </span>
                        <span>View Profile</span>
                      </li>
                      <li
                        onClick={
                          handleLogout
                        }
                      >
                        <span className="logout-icon">
                          <RiLogoutCircleRLine />
                        </span>
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <button className="signin-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {/* end login-cart-wishlist-container */}

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
