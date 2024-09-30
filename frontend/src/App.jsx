import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Footer from './Components/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import SearchProducts from './Components/SearchProducts/SearchProducts';

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <Router>
      <Navbar setFilteredProducts={setFilteredProducts} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signin' element={<SignUp />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path="/search-products" element={<SearchProducts filteredProducts={filteredProducts} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
