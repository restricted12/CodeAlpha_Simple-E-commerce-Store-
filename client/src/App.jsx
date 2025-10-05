// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import NewProducts from "./pages/products-new.jsx";
import Products from "./pages/products.jsx";
import ProductDetail from "./pages/singleproduct.jsx";
import Categories from "./pages/categories.jsx";
import About from "./pages/about.jsx";
import Deals from "./pages/deals.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import Cart from "./pages/cart.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import React from 'react';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/new-products" element={<NewProducts/>}/>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

