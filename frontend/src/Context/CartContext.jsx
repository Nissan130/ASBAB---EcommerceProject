import { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Track the items in the cart, an array of objects
  // console.log(cartItems);
  const [productCount, setProductCount] = useState(1); // Track the count for a product before adding to cart

  const [favouriteItems, setFavouriteItems] = useState([]); // Track favorite items

  // Function to add to favorites
  const addToFavourite = (product) => {
    const itemIndex = favouriteItems.findIndex((item) => item.id === product.id);
    
    if (itemIndex === -1) {
      setFavouriteItems([...favouriteItems, product]);
    }
  };
  // State to track if the product is in the favorites
  const [isFavourite, setIsFavourite] = useState(false);

  // Toggle favorite status
  const handleFavouriteClick = ({p}) => {
    addToFavourite(p);  // Call the function to add the product to the favorite list
    setIsFavourite(!isFavourite);  // Toggle the local favorite state
  };

  // Handle increment product count
  const handleIncrementItem = () => {
    setProductCount(productCount + 1);
  };

  // Handle decrement product count
  const handleDecrementItem = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  // Add to Cart function
  const addToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      // Update the count of the existing product
      const updatedCart = cartItems.map((item, index) => {
        if (index === itemIndex) {
          return { ...item, quantity: item.quantity + productCount };
        }
        return item;
      });
      setCartItems(updatedCart);
    } else {
      // Add the product with the count
      setCartItems([...cartItems, { ...product, quantity: productCount }]);
    }
    // Reset product count after adding to cart
    setProductCount(1);
  };

    // Delete from Cart function
    const deleteFromCart = (productId) => {
      const updatedCart = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedCart);
    };
    

    // Update favouriteCount based on the favorite items
  const favouriteCount = favouriteItems.length;

  const contextValue = {
    cartItems,
    productCount,
    handleIncrementItem,
    handleDecrementItem,
    addToCart,
    all_product,
    deleteFromCart,
    addToFavourite,
    favouriteCount,
    handleFavouriteClick,
    isFavourite
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
