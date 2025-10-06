import React from "react";
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
import Checkout from "./pages/checkout.jsx";
import Orders from "./pages/orders.jsx";
import OrderTracking from "./pages/order-tracking.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Admin Components
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProductsEnhanced from "./pages/admin/AdminProductsEnhanced.jsx";
import AdminOrdersEnhanced from "./pages/admin/AdminOrdersEnhanced.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import AdminAnalytics from "./pages/admin/AdminAnalytics.jsx";

import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={
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
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsEnhanced />} />
            <Route path="orders" element={<AdminOrdersEnhanced />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

