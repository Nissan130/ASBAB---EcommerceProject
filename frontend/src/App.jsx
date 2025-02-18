import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Footer from "./Components/Footer/Footer";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import SearchProducts from "./Components/SearchProducts/SearchProducts";
import LoginSignup from "./Pages/LoginSignup";
import MyProfile from "./Components/MyProfile/MyProfile";
import GlobalContextProvider from "./Context/GlobalContext";
import Billing from "./Pages/Billing";
import OrderConfirmation from "./Components/OrderConfirmation/OrderConfirmation";
import PaymentMethod from "./Components/PaymentMethod/PaymentMethod";
import PopularProducts from "./Components/PopularProducts/PopularProducts";
import NewCollections from "./Components/NewCollections/NewCollections";
import PaymentResult from "./Components/PaymentResult/PaymentResult";
import PaymentFail from "./Components/PaymentFail/PaymentFail";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import FavoriteItems from "./Components/FavoriteItems/FavoriteItems";
import ProductDescriptionReview from "./Components/ProductDescriptionReview/ProductDescriptionReview";
import ProductDescription from "./Components/ProductDescription/ProductDescription";
import ProductReview from "./Components/ProductReview/ProductReview";
import ConfirmCashOnDelivery from "./Components/ConfirmCashOnDelivery/ConfirmCashOnDelivery";

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <Router>
      <GlobalContextProvider>
        <Navbar setFilteredProducts={setFilteredProducts} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          {/* <Route path='/profile' element={<MyProfile />} /> */}
          <Route path="/profile/*" element={<MyProfile />} />
          <Route path="/product/:productId" element={<ProductDetails />}>
            <Route
              path="product-description"
              element={<ProductDescription />}
            />
            <Route path="product-review" element={<ProductReview />} />
          </Route>

          <Route path="/search-products" element={<SearchProducts />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/payment" element={<PaymentMethod />} />
          <Route path="/favorite-items" element={<FavoriteItems />} />
          <Route path="/popular-products" element={<PopularProducts />} />
          <Route path="/new-collections" element={<NewCollections />} />
          {/* <Route path='/payment/success/:tranId' element={<PaymentSuccess />} /> */}
          <Route path="/payment/result" element={<PaymentResult />} />
          {/* <Route path='/profile/order-history' element={<OrderHistory/>} /> */}
          <Route path="/confirm-cash-on-delivery" element={<ConfirmCashOnDelivery />} />
        </Routes>
        <Footer />
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
