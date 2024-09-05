import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Home from './Pages/Home';
import DisplayProduct from './Components/DisplayProduct/DisplayProduct';

function App() {
 
  return (
    <Router>
           <Navbar />
            <Routes>      
            <Route path='/' element={<Home />}/>
            <Route path='/wishlist' element={<Wishlist />}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/signin' element={<LoginSignup />}/>
            <Route path="/product/:id" element={<DisplayProduct />} /> {/* Add the ProductDisplay route */}
           </Routes> 
          
    </Router>
   
  )
}

export default App
