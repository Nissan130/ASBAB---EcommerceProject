// import React, { createContext, useState, useEffect } from "react";

// // Create GlobalContext
// export const GlobalContext = createContext();

// const GlobalContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([]); // State to hold the products
//   const [cartItems, setCartItems] = useState([]); // Track cart items
//   const [productCount, setProductCount] = useState(1); // Track product count
//   const [favouriteItems, setFavouriteItems] = useState([]); // Track favorite items
//   const [isFavourite, setIsFavourite] = useState(false);

//   // New state for shipping address and payment method
//   const [shippingAddress, setShippingAddress] = useState({
//     name: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [userId, setUserId] = useState(null); // State for user ID
//   const [userInfo, setUserInfo] = useState(null); // State to hold user information
  
//   // Utility function to get user ID from token
//   const getUserIdFromToken = (token) => {
//     return token ? JSON.parse(atob(token.split(".")[1])).userId : null;
//   };

//   // Fetch user info whenever userId changes
//   const fetchUserInfo = async () => {
//     if (userId) {
//       try {
//         const response = await fetch(`http://localhost:5002/user/${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch user information');
//         }
//         const data = await response.json();
//         setUserInfo(data); // Update state with the new user's info
//       } catch (error) {
//         console.error('Error fetching user information:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     const newUserId = getUserIdFromToken(token);
//     setUserId(newUserId); // Update userId when token changes
//   }, []);

//   useEffect(() => {
//     fetchUserInfo(); // Fetch user info when userId changes

//     // Auto-refresh user information every 30 seconds as a fallback
//     const intervalId = setInterval(() => {
//       fetchUserInfo(); // Re-fetch user info
//     }, 30000); // 30 seconds polling interval

//     // Cleanup interval when component unmounts
//     return () => clearInterval(intervalId);
//   }, [userId]); // Re-run when userId changes
  

//   // Fetch products from the server when the component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:5002/products");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Load cart data based on userId
//   useEffect(() => {
//     const loadCart = async () => {
//       const token = localStorage.getItem("userToken");

//       if (token && userId) {
//         try {
//           const response = await fetch(`http://localhost:5002/cart/${userId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error("Failed to fetch cart from the database");
//           }

//           const dbCartItems = await response.json();
//           setCartItems(dbCartItems);
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };

//     if (userId) {
//       loadCart();
//     }
//   }, [userId]); // Re-run when userId changes

//   // Update localStorage whenever cartItems changes
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ---------- Cart Operations ----------

//   const addToCart = async (product) => {
//     const itemIndex = cartItems.findIndex(
//       (item) => item.product_id === product.product_id
//     );

//     let updatedCart;
//     if (itemIndex > -1) {
//       updatedCart = cartItems.map((item, index) => {
//         if (index === itemIndex) {
//           return { ...item, quantity: item.quantity + productCount };
//         }
//         return item;
//       });
//     } else {
//       updatedCart = [...cartItems, { ...product, quantity: productCount }];
//     }

//     setCartItems(updatedCart);

//     const token = localStorage.getItem("userToken");
//     if (token && userId) {
//       try {
//         const response = await fetch("http://localhost:5002/cart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             userId,
//             productId: product.product_id,
//             quantity: productCount,
//           }),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("Failed to add item to cart:", errorText);
//           throw new Error(errorText);
//         }

//         alert("Product added to cart");
//       } catch (error) {
//         console.error("Error adding to cart:", error.message);
//       }
//     }

//     setProductCount(1); // Reset product count
//   };

//   const handleFavouriteClick = (product) => {
//     const itemIndex = favouriteItems.findIndex((item) => item.user_id === product.user_id);
//     if (itemIndex === -1) {
//       setFavouriteItems([...favouriteItems, product]);
//     }
//     setIsFavourite(!isFavourite);
//   };

//   const handleIncrementItem = () => {
//     setProductCount(productCount + 1);
//   };

//   const handleDecrementItem = () => {
//     if (productCount > 1) {
//       setProductCount(productCount - 1);
//     }
//   };

//   const deleteFromCart = async (productId) => {
//     const updatedCart = cartItems.filter((item) => item.product_id !== productId);
//     setCartItems(updatedCart);

//     const token = localStorage.getItem("userToken");
//     if (token && userId) {
//       try {
//         const response = await fetch("http://localhost:5002/cart", {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             userId,
//             productId,
//           }),
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("Failed to delete item from cart:", errorText);
//           throw new Error(errorText);
//         }

//         alert("Product deleted from cart");
//       } catch (error) {
//         console.error("Error deleting from cart:", error.message);
//       }
//     }
//   };

//   const favouriteCount = favouriteItems.length;

//   // Functions to update shipping address and payment method
//   const updateShippingAddress = (address) => {
//     setShippingAddress(address);
//   };

//   const updatePaymentMethod = (method) => {
//     setPaymentMethod(method);
//   };

//   const contextValue = {
//     products,
//     cartItems,
//     productCount,
//     handleIncrementItem,
//     handleDecrementItem,
//     addToCart,
//     deleteFromCart,
//     favouriteItems,
//     favouriteCount,
//     handleFavouriteClick,
//     isFavourite,
//     shippingAddress,
//     paymentMethod,
//     updateShippingAddress,
//     updatePaymentMethod,
//     userId,
//     userInfo,
//     setUserId,
//     setUserInfo,
//   };

//   return (
//     <GlobalContext.Provider value={contextValue}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export default GlobalContextProvider;

import React, { createContext, useState, useEffect } from "react";

// Create GlobalContext
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold the products
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const [productCount, setProductCount] = useState(1); // Track product count
  const [favouriteItems, setFavouriteItems] = useState([]); // Track favorite items
  const [isFavourite, setIsFavourite] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userId, setUserId] = useState(null); // State for user ID
  const [userInfo, setUserInfo] = useState(null); // State to hold user information
  

    // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  
  // Utility function to get user ID from token
  const getUserIdFromToken = (token) => {
    return token ? JSON.parse(atob(token.split(".")[1])).userId : null;
  };

  const loginUser = (token) => {
    localStorage.setItem('userToken', token); // Store the token in localStorage
    const newUserId = getUserIdFromToken(token); // Extract userId from token
    setUserId(newUserId); // Update userId in state
    fetchUserInfo(); // Immediately fetch user information
  };

  // Fetch user info whenever userId changes
  const fetchUserInfo = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:5002/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }
        const data = await response.json();
        setUserInfo(data); // Update state with the new user's info
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    }
  };

  // On component mount, check for user token and set userId
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const newUserId = getUserIdFromToken(token);
    setUserId(newUserId); // Update userId when token changes
  }, []);

  // When userId changes, fetch user info and load cart items
  useEffect(() => {
    fetchUserInfo(); // Fetch user info when userId changes

    const loadCart = async () => {
      const token = localStorage.getItem("userToken");

      if (token && userId) {
        try {
          const response = await fetch(`http://localhost:5002/cart/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch cart from the database");
          }

          const dbCartItems = await response.json();
          setCartItems(dbCartItems);
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };

    if (userId) {
      loadCart();
    }

    // Auto-refresh user information every 30 seconds as a fallback
    const intervalId = setInterval(() => {
      fetchUserInfo(); // Re-fetch user info
    }, 30000); // 30 seconds polling interval

    return () => clearInterval(intervalId); // Cleanup interval when component unmounts
  }, [userId]); // Re-run when userId changes

  // Handle user logout
  const logoutUser = () => {
    localStorage.removeItem("userToken"); // Clear token from localStorage
    setUserId(null); // Clear userId in state
    setUserInfo(null); // Clear user info in state
    setCartItems([]); // Clear cart items
    localStorage.removeItem("cartItems"); // Clear cart in localStorage
  };

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart and update the backend
  const addToCart = async (product) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.product_id === product.product_id
    );

    let updatedCart;
    if (itemIndex > -1) {
      updatedCart = cartItems.map((item, index) => {
        if (index === itemIndex) {
          return { ...item, quantity: item.quantity + productCount };
        }
        return item;
      });
    } else {
      updatedCart = [...cartItems, { ...product, quantity: productCount }];
    }

    setCartItems(updatedCart);

    const token = localStorage.getItem("userToken");
    if (token && userId) {
      try {
        const response = await fetch("http://localhost:5002/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            productId: product.product_id,
            quantity: productCount,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to add item to cart:", errorText);
          throw new Error(errorText);
        }

        alert("Product added to cart");
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }

    setProductCount(1); // Reset product count
  };

   const handleFavouriteClick = (product) => {
    const itemIndex = favouriteItems.findIndex((item) => item.user_id === product.user_id);
    if (itemIndex === -1) {
      setFavouriteItems([...favouriteItems, product]);
    }
    setIsFavourite(!isFavourite);
  };

  const handleIncrementItem = () => {
    setProductCount(productCount + 1);
  };

  const handleDecrementItem = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  const deleteFromCart = async (productId) => {
    const updatedCart = cartItems.filter((item) => item.product_id !== productId);
    setCartItems(updatedCart);

    const token = localStorage.getItem("userToken");
    if (token && userId) {
      try {
        const response = await fetch("http://localhost:5002/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            productId,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to delete item from cart:", errorText);
          throw new Error(errorText);
        }

        alert("Product deleted from cart");
      } catch (error) {
        console.error("Error deleting from cart:", error.message);
      }
    }
  };

  const favouriteCount = favouriteItems.length;

  // Functions to update shipping address and payment method
  const updateShippingAddress = (address) => {
    setShippingAddress(address);
  };

  const updatePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const contextValue = {
    products,
    cartItems,
    productCount,
    handleIncrementItem,
    handleDecrementItem,
    addToCart,
    deleteFromCart,
    favouriteItems,
    favouriteCount,
    handleFavouriteClick,
    isFavourite,
    shippingAddress,
    paymentMethod,
    updateShippingAddress,
    updatePaymentMethod,
    userId,
    userInfo,
    setUserId,
    setUserInfo,
    logoutUser, // Add logoutUser to the context
    loginUser // Add loginUser to the context
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
