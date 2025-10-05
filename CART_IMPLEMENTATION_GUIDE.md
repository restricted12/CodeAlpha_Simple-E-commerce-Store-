# Cart Implementation Guide

## Overview
This e-commerce store uses a localStorage-based cart system that works for both authenticated and non-authenticated users. The cart data persists in the browser's localStorage and is managed through utility functions.

## Key Features

### ✅ Implemented Features
- **Add items to cart** - Users can add products to their cart from the products page
- **Cart persistence** - Cart data is stored in localStorage and persists across browser sessions
- **Quantity management** - Users can increase/decrease item quantities in the cart
- **Remove items** - Users can remove individual items from the cart
- **Clear cart** - Users can clear their entire cart
- **Cart count display** - Cart item count is displayed in the header
- **Real-time updates** - Cart updates are reflected immediately across all components

### 🔄 Cart Data Structure
```javascript
// Cart items are stored as an array of objects
[
  {
    product: {
      _id: "product_id",
      name: "Product Name",
      price: 99.99,
      image: "product_image_url",
      category: "Category",
      description: "Product description",
      stock: 10
    },
    quantity: 2
  }
]
```

## Files and Components

### Core Files
- `client/src/utils/cartUtils.js` - Main cart utility functions
- `client/src/pages/cart.jsx` - Cart page component
- `client/src/components/AddToCartButton.jsx` - Reusable add to cart button
- `client/src/components/header.jsx` - Header with cart count display

### Utility Functions
```javascript
// Get cart from localStorage
getCart()

// Save cart to localStorage
saveCart(cart)

// Add product to cart
addToCart(product, quantity)

// Remove product from cart
removeFromCart(productId)

// Update product quantity
updateCartItemQuantity(productId, quantity)

// Clear entire cart
clearCart()

// Get total number of items in cart
getCartItemCount()

// Get total price of cart
getCartTotal()

// Check if product is in cart
isInCart(productId)

// Get quantity of specific product in cart
getCartItemQuantity(productId)
```

## Usage Examples

### Adding Items to Cart
```javascript
import { addToCart } from '../utils/cartUtils';

const handleAddToCart = (product) => {
  const success = addToCart(product, 1);
  if (success) {
    alert(`${product.name} added to cart!`);
  }
};
```

### Using the AddToCartButton Component
```javascript
import AddToCartButton from '../components/AddToCartButton';

<AddToCartButton 
  product={product} 
  disabled={product.stock <= 0}
  size="medium"
/>
```

### Listening for Cart Updates
```javascript
useEffect(() => {
  const handleCartUpdate = () => {
    // Update your component state
    setCartItemCount(getCartItemCount());
  };
  
  window.addEventListener('cartUpdated', handleCartUpdate);
  return () => window.removeEventListener('cartUpdated', handleCartUpdate);
}, []);
```

## Cart Page Features

### ✅ Available Features
- **View cart items** - Display all items in the cart with images, names, and prices
- **Quantity controls** - Increase/decrease quantity with +/- buttons
- **Remove items** - Remove individual items with trash button
- **Clear cart** - Clear all items with confirmation dialog
- **Order summary** - Shows subtotal, shipping, tax, and total
- **Continue shopping** - Navigate back to products page
- **Checkout button** - Placeholder for future checkout implementation

### 🎨 UI Features
- **Responsive design** - Works on desktop and mobile
- **Loading states** - Visual feedback during operations
- **Empty cart state** - Friendly message when cart is empty
- **Price formatting** - Proper currency formatting
- **Stock validation** - Prevents adding out-of-stock items

## Future Enhancements

### 🔮 Planned Features
- **Checkout process** - Complete checkout flow with payment
- **Cart synchronization** - Sync cart with user account when logged in
- **Wishlist integration** - Add items to wishlist from cart
- **Save for later** - Save cart items for future purchase
- **Cart sharing** - Share cart with others
- **Bulk operations** - Select multiple items for bulk actions

### 🔧 Technical Improvements
- **Cart validation** - Validate product availability and pricing
- **Error handling** - Better error messages and recovery
- **Performance optimization** - Optimize for large cart sizes
- **Offline support** - Work without internet connection
- **Cart backup** - Backup cart data to cloud storage

## Testing the Cart

### Manual Testing Steps
1. **Add items to cart**
   - Go to `/products` page
   - Click "Add to Cart" on any product
   - Verify cart count increases in header

2. **View cart**
   - Click cart icon in header
   - Verify items are displayed correctly
   - Check quantities and prices

3. **Modify cart**
   - Change quantities using +/- buttons
   - Remove items using trash button
   - Clear entire cart

4. **Persistence**
   - Refresh the page
   - Verify cart items are still there
   - Close and reopen browser to test localStorage persistence

### Browser Developer Tools
```javascript
// Check cart in localStorage
localStorage.getItem('cart')

// Clear cart manually
localStorage.removeItem('cart')

// Add test item
const testCart = [{
  product: {
    _id: "test_id",
    name: "Test Product",
    price: 29.99,
    image: "test_image.jpg"
  },
  quantity: 1
}];
localStorage.setItem('cart', JSON.stringify(testCart));
```

## Troubleshooting

### Common Issues
1. **Cart not updating** - Check if `cartUpdated` event is being dispatched
2. **Items not persisting** - Verify localStorage is enabled in browser
3. **Quantity not changing** - Check if `updateCartItemQuantity` is called correctly
4. **Cart count wrong** - Ensure `getCartItemCount` is calculating correctly

### Debug Tips
- Use browser dev tools to inspect localStorage
- Check console for error messages
- Verify all imports are correct
- Test with different browsers/devices 