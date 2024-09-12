// import React, { useContext } from "react";
// import { CartContext } from "../../Context/CartContext"; // Assuming wishlist items are managed via context
// import "./WishList.css";

// const WishList = () => {
//   const { wishlistItems, removeFromWishlist } = useContext(CartContext);

//   return (
//     <div className="wishlist-page">
//       <h2>Your Wishlist</h2>

//       {wishlistItems.length === 0 ? (
//         <div className="wishlist-empty">
//           <p>Your wishlist is currently empty.</p>
//         </div>
//       ) : (
//         <div className="wishlist-items">
//           {wishlistItems.map((item) => (
//             <div className="wishlist-item" key={item.id}>
//               <div className="wishlist-item-image">
//                 <img src={item.image} alt={item.name} />
//               </div>
//               <div className="wishlist-item-details">
//                 <h3>{item.name}</h3>
//                 <p>Price: {item.new_price}</p>
//               </div>
//               <div className="wishlist-item-remove">
//                 <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishList;
