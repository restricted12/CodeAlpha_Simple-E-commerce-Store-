// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Products from "./pages/products.jsx";
import ProductDetail from "./pages/product_detail.jsx";
import Categories from "./pages/categories.jsx";
import About from "./pages/about.jsx";
import Deals from "./pages/deals.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Profile from "./pages/profile.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";

import React from 'react';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;

