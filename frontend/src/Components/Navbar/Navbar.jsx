import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import asbab_logo from "../Assets/asbab_logo.jpg";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropright  } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
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
            window.scrollTo(0,0);
            navigate("/");
          }}
        >
          <img src={asbab_logo} alt="logo" />
        </div>
        <div className="search-bar" ref={searchInputRef}>
          <div className="nav-search-icon">
          <FiSearch />
          </div>
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
                  <FiSearch style={{marginRight:"12px"}} />{category}
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

          {/* all category dropdown starts  */}
          <li className="allcategory-list">
            All Categories <HiMenu style={{fontSize: "18px", strokeWidth: "1.5"}}/>
            <ul className="allcategory-list-items">
              <li className="newCollection-side-list category-link">
                <div onClick={()=>{
                  window.scrollTo(0,0);
                  navigate('/new-collections');
                }} 
                className="category-link-item">New Collections</div>
                
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
                <ul>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Womens</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Kids</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                </ul>
              </li>

              <li className="popularProducts-side-list category-link">
                <div onClick={()=>{
                  window.scrollTo(0,0);
                  navigate('/popular-products');

                }} className="category-link-item">Popular Products</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
                <ul>
                  <li className="category-link">
                    <div className="category-link-item">Mens</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Womens</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                  <li className="category-link">
                    <div className="category-link-item">Kids</div>
                    <div className="category-right-arrow">
                      <IoMdArrowDropright />
                    </div>
                  </li>
                </ul>
              </li>


              <li className="category-link">
                <div className="category-link-item">Fashion & Apparel</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>

              <li className="category-link">
                <div className="category-link-item">Electronics & Gadgets</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Beauty & Wellness</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>

              <li className="category-link">
                <div className="category-link-item">Home & Living</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Sports & Outdoors</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Groceries & Food</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Baby & Kids</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Pet Supplies</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Books, Art & Hobbies</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Seasonal & Gifts</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
          {/* all category dropdown end  */}


          {/* Home & Living starts */}
          <li className="home-living-category category-link"> 
          <div className="category-link-item">Home & Living<IoMdArrowDropdown  /></div>
          <ul>
              <li className="category-link">
                <div className="category-link-item">Kitchenware</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Furniture</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Home Decor</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Bedding</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Linens</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Storage Solutions</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Lighting</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Bath Essentials</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Cleaning Supplies</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              
          </ul>
          </li>
           {/* Home & Living starts */}

          {/* ======fashion category starts======= */}
          <li className="fashion-category category-link">
            <div className="category-link-item">Fashion<IoMdArrowDropdown  /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Men's Fashion</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Women's Fashion</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Kids' Clothing</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Shoes</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Bags</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Activewear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Accessories</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
            {/* ======fashion category ends======= */}


          {/* ======Footwear category starts======= */}
          <li className="footwear-category category-link">
            <div className="category-link-item">Footwear</div>
            <div className="category-right-arrow">
              <IoMdArrowDropdown />
            </div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Mens Footwear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Womens Footwear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Kids Footwear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
           {/* ======Footwear category end======= */}
          

          {/* ======Electronics category start======= */}
          <li className="electronics-category category-link">
            <div className="category-link-item">Electronics<IoMdArrowDropdown /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Smartphones</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Tablets</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Laptops</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Computers</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Gaming Consoles</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Smartwatches</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Cameras</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Drones</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Headphones</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Computer Accessories</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
           {/* ======Electronics category end======= */}


          {/* ======groceries category start ======= */}
          <li className="groceries-category category-link">
            <div className="category-link-item">Groceries<IoMdArrowDropdown /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Snacks</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Beverages</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Coffee</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Tea</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Baking Essentials</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
          {/* ======groceries category end ======= */}

          {/* ======sports & outdoor category start ======= */}
          <li className="groceries-category category-link">
            <div className="category-link-item">Sports & Outdoors<IoMdArrowDropdown /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Fitness Equipment</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Outdoor Gear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Cycling</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Camping</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Sports Accessories</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Swimwear</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Yoga</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
          {/* ======sports & outdoor end ======= */}


           {/* ======baby & kids category start ======= */}
           <li className="groceries-category category-link">
            <div className="category-link-item">Baby & Kids<IoMdArrowDropdown /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Toys</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Baby Clothing</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Strollers</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Camping</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Nursery Essentials</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Diapers</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Feeding Supplies</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Educational Toys</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
          {/* ======baby & kids end ======= */}

           {/* ======Beauty & Wellness category start ======= */}
           <li className="groceries-category category-link">
            <div className="category-link-item">Beauty & Wellness<IoMdArrowDropdown /></div>
            <ul>
              <li className="category-link">
                <div className="category-link-item">Skincare</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Hair Care</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Makeup</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Perfumes</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Health Supplements</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Personal Care</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Fitness Equipment</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
              <li className="category-link">
                <div className="category-link-item">Spa Essentials</div>
                <div className="category-right-arrow">
                  <IoMdArrowDropright />
                </div>
              </li>
            </ul>
          </li>
          {/* ======Beauty & Wellness end ======= */}
        </ul>
      </div>
      {/* === nav second end === */}
    </div>
  );
};

export default Navbar;
