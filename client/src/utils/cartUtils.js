// Cart utility functions for localStorage management

export const getCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product._id === product._id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product already exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new product to cart
    cart.push({
      product: product,
      quantity: quantity
    });
  }
  
  return saveCart(cart);
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product._id !== productId);
  return saveCart(updatedCart);
};

export const updateCartItemQuantity = (productId, quantity) => {
  if (quantity < 1) {
    return removeFromCart(productId);
  }
  
  const cart = getCart();
  const updatedCart = cart.map(item => {
    if (item.product._id === productId) {
      return { ...item, quantity: quantity };
    }
    return item;
  });
  
  return saveCart(updatedCart);
};

export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};

export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
};

export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some(item => item.product._id === productId);
};

export const getCartItemQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(item => item.product._id === productId);
  return item ? item.quantity : 0;
}; 