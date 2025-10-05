import React, { createContext, useContext, useState, useEffect } from 'react';
import { authGet, publicPost, authPost, authPut, authDelete } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  };
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  
  // Product-related state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Order-related state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  // Cart-related state
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    // Check if user is logged in on app start
    if (token) {
      // Check if token is valid before proceeding
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        logout();
        return;
      }
      
      try {
        // Check if token is expired
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          logout();
          return;
        }
      } catch (error) {
        logout();
        return;
      }
      
      // Try to load user data from localStorage first
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        try {
          const parsedUserData = JSON.parse(savedUserData);
          setUser(parsedUserData);
          setLoading(false); // Set loading to false since we have user data
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          // If parsing fails, try to fetch from server
          fetchCurrentUser();
        }
      } else {
        // No saved user data, fetch from server
        fetchCurrentUser();
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch orders when user is authenticated
  useEffect(() => {
    if (user && token) {
      fetchOrders();
      fetchCart();
    } else {
      // Clear orders and cart when user logs out
      setOrders([]);
      setOrdersError(null);
      setCart(null);
      setCartError(null);
    }
  }, [user, token]);

  const fetchCurrentUser = async () => {
    try {
      const userData = await authGet('/users/profile');
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error fetching user:', error);
      // Check if it's a 401 error (unauthorized/token expired)
      if (error.message.includes('401')) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to manually refresh user data
  const refreshUserData = async () => {
    if (!token) {
      return;
    }
    await fetchCurrentUser();
  };

  // Cart-related functions
  const fetchCart = async () => {
    if (!user || !token) {
      return;
    }

    try {
      setCartLoading(true);
      setCartError(null);
      
      // Fetch cart for the current user
      const response = await authGet(`/cart/user/${user._id}`);
      setCart(response);
      
      return response;
    } catch (err) {
      console.error('Error fetching cart:', err);
      setCartError('Failed to load cart. Please try again later.');
      throw err;
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user || !token) {
      throw new Error('Please log in to add items to cart');
    }

    try {
      const response = await authPost(`/cart/user/${user._id}/add`, {
        product: productId,
        quantity: quantity
      });
      
      // Update cart state
      setCart(response);
      
      return response;
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    if (!user || !token) {
      throw new Error('Please log in to remove items from cart');
    }

    try {
      const response = await authPost(`/cart/user/${user._id}/remove`, {
        product: productId
      });
      
      // Update cart state
      setCart(response);
      
      return response;
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw err;
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    if (!user || !token) {
      throw new Error('Please log in to update cart');
    }

    try {
      // First remove the item
      await removeFromCart(productId);
      
      // Then add it back with new quantity
      if (quantity > 0) {
        await addToCart(productId, quantity);
      }
      
      return true;
    } catch (err) {
      console.error('Error updating cart item quantity:', err);
      throw err;
    }
  };

  const clearCart = async () => {
    if (!user || !token) {
      throw new Error('Please log in to clear cart');
    }

    try {
      // Remove all items one by one
      if (cart && cart.items) {
        for (const item of cart.items) {
          await removeFromCart(item.product._id);
        }
      }
      
      setCart(null);
      return true;
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    }
  };

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const isInCart = (productId) => {
    if (!cart || !cart.items) return false;
    return cart.items.some(item => item.product._id === productId);
  };

  const getCartItemQuantity = (productId) => {
    if (!cart || !cart.items) return 0;
    const item = cart.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  // Order-related functions
  const fetchOrders = async () => {
    if (!user || !token) {
      return;
    }

    try {
      setOrdersLoading(true);
      setOrdersError(null);
      
      // Fetch orders for the current user
      const response = await authGet(`/orders/get-orders-byuser/user/${user._id}`);
      setOrders(response);
      
      return response;
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrdersError('Failed to load orders. Please try again later.');
      throw err;
    } finally {
      setOrdersLoading(false);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const response = await authGet(`/orders/get-single-order/${orderId}`);
      return response;
    } catch (err) {
      console.error('Error fetching order:', err);
      throw err;
    }
  };

  const createOrder = async (orderData) => {
    try {
      const response = await authPost('/orders/create-order', orderData);
      
      // Refresh orders list after creating new order
      await fetchOrders();
      
      return response;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const updateOrder = async (orderId, updateData) => {
    try {
      const response = await authPut(`/orders/update-order/${orderId}`, updateData);
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, ...response } : order
        )
      );
      
      return response;
    } catch (err) {
      console.error('Error updating order:', err);
      throw err;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await authDelete(`/orders/delete-order/${orderId}`);
      
      // Remove the order from local state
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      
      return response;
    } catch (err) {
      console.error('Error deleting order:', err);
      throw err;
    }
  };

  const getOrdersByStatus = (status) => {
    if (status === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  };

  const getOrderStatistics = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      processing: orders.filter(order => order.status === 'processing').length,
      shipped: orders.filter(order => order.status === 'shipped').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length
    };

    return stats;
  };

  const sortOrders = (ordersToSort, sortBy) => {
    const sortedOrders = [...ordersToSort];
    
    switch (sortBy) {
      case 'newest':
        return sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'total-high':
        return sortedOrders.sort((a, b) => b.total - a.total);
      case 'total-low':
        return sortedOrders.sort((a, b) => a.total - b.total);
      case 'status':
        return sortedOrders.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return sortedOrders;
    }
  };

  const filterOrders = (ordersToFilter, filters = {}) => {
    let filteredOrders = [...ordersToFilter];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === filters.status);
    }

    // Filter by date range
    if (filters.startDate) {
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.createdAt) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.createdAt) <= new Date(filters.endDate)
      );
    }

    // Filter by total amount range
    if (filters.minTotal) {
      filteredOrders = filteredOrders.filter(order => order.total >= filters.minTotal);
    }

    if (filters.maxTotal) {
      filteredOrders = filteredOrders.filter(order => order.total <= filters.maxTotal);
    }

    return filteredOrders;
  };

  const refreshOrders = async () => {
    await fetchOrders();
  };

  // Product-related functions
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      // Fetch all products from the API
      const response = await authGet('/products/get-all-products');
      setProducts(response);
      
      // Extract unique categories from products
      const uniqueCategories = [...new Set(response.map(product => product.category).filter(Boolean))];
      setCategories([
        { id: 'all', name: 'All Categories' },
        ...uniqueCategories.map(category => ({ id: category.toLowerCase(), name: category }))
      ]);
      
      return response;
    } catch (err) {
      console.error('Error fetching products:', err);
      setProductsError('Failed to load products. Please try again later.');
      throw err;
    } finally {
      setProductsLoading(false);
    }
  };

  const getProductById = async (productId) => {
    try {
      const response = await authGet(`/products/get-product/${productId}`);
      return response;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  };

  const searchProducts = (searchTerm, filters = {}) => {
    let filteredProducts = [...products];

    // Search by name, description, or category
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        return product.name.toLowerCase().includes(searchLower) ||
               (product.description && product.description.toLowerCase().includes(searchLower)) ||
               (product.category && product.category.toLowerCase().includes(searchLower));
      });
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category && product.category.toLowerCase() === filters.category
      );
    }

    // Filter by price range
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.maxPrice
      );
    }

    // Filter by stock availability
    if (filters.inStockOnly) {
      filteredProducts = filteredProducts.filter(product => 
        product.stock > 0
      );
    }

    return filteredProducts;
  };

  const sortProducts = (productsToSort, sortBy) => {
    const sortedProducts = [...productsToSort];
    
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'name':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return sortedProducts;
    }
  };

  const getProductsByCategory = (category) => {
    if (category === 'all') {
      return products;
    }
    return products.filter(product => 
      product.category && product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getFeaturedProducts = (limit = 8) => {
    // For now, return the most recent products as featured
    // In a real app, you might have a 'featured' field in the product model
    return products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  };

  const getProductsOnSale = () => {
    // For now, return products with low stock as "on sale"
    // In a real app, you might have a 'sale' or 'discount' field
    return products.filter(product => product.stock < 10);
  };

  const login = async (email, password) => {
    try {
      const data = await publicPost('/users/login', { email, password });

      // Store token and complete user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await publicPost('/users/create-account', userData);

      // Store token and complete user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
    // Clear products data on logout
    setProducts([]);
    setCategories([]);
    setProductsError(null);
    // Clear orders data on logout
    setOrders([]);
    setOrdersError(null);
    // Clear cart data on logout
    setCart(null);
    setCartError(null);
  };

  const value = {
    // User-related
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshUserData,
    isAuthenticated: !!token,
    
    // Product-related
    products,
    productsLoading,
    productsError,
    categories,
    fetchProducts,
    getProductById,
    searchProducts,
    sortProducts,
    getProductsByCategory,
    getFeaturedProducts,
    getProductsOnSale,
    
    // Order-related
    orders,
    ordersLoading,
    ordersError,
    fetchOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByStatus,
    getOrderStatistics,
    sortOrders,
    filterOrders,
    refreshOrders,
    
    // Cart-related
    cart,
    cartLoading,
    cartError,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
    getCartItemQuantity,
    refreshCart
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 