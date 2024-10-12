import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Footer from './Components/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import SearchProducts from './Components/SearchProducts/SearchProducts';
import LoginSignup from './Pages/LoginSignup';
import MyProfile from './Components/MyProfile/MyProfile';
import GlobalContextProvider from './Context/GlobalContext';
import Billing from './Pages/Billing';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import PaymentMethod from './Components/PaymentMethod/PaymentMethod';

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <Router>
      <GlobalContextProvider>
      <Navbar setFilteredProducts={setFilteredProducts} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/profile' element={<MyProfile />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path="/search-products" element={<SearchProducts filteredProducts={filteredProducts} />} />
        <Route path='/billing' element={<Billing />} />
        <Route path='/payment' element={<PaymentMethod />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
      </Routes>
      <Footer />
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
