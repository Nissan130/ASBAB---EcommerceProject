import React, { createContext, useState, useEffect } from "react";

// Create GlobalContext
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to hold the products
  const [cartItems, setCartItems] = useState([]); // Track cart items
  const [productCount, setProductCount] = useState(1); // Track product count
  const [favouriteItems, setFavouriteItems] = useState([]); // Track favorite items
  const [isFavourite, setIsFavourite] = useState(false);

  // New state for shipping address and payment method
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5002/products"); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Set the fetched products to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  // ---------- Load cart data ----------
  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("userToken");

      // Load cart items from localStorage
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }

      // If user is logged in, fetch the cart from the backend
      if (token) {
        const getUserIdFromToken = (token) => {
          return token ? JSON.parse(atob(token.split(".")[1])).userId : null;
        };
        const userId = getUserIdFromToken(token);

        if (userId) {
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
            setCartItems(dbCartItems); // Overwrite cartItems with database items
          } catch (error) {
            console.error("Error fetching cart:", error);
          }
        }
      }
    };

    loadCart();
  }, []); // Run once on mount

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ---------- Cart Operations ----------
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

    // Save the updated cart to the backend if user is logged in
    const token = localStorage.getItem("userToken");
    if (token) {
      const getUserIdFromToken = (token) => {
        return token ? JSON.parse(atob(token.split(".")[1])).userId : null;
      };
      const userId = getUserIdFromToken(token);

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
    const itemIndex = favouriteItems.findIndex(
      (item) => item.id === product.id
    );
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
    if (token) {
      const getUserIdFromToken = (token) => {
        return token ? JSON.parse(atob(token.split(".")[1])).userId : null;
      };
      const userId = getUserIdFromToken(token);
  
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
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
