# AuthContext Orders Integration Guide

## Overview
The AuthContext has been enhanced with comprehensive orders functionality, allowing you to manage orders globally across your application. This guide explains how to use the orders features from the AuthContext.

## Available Order State

### State Variables
```javascript
const { 
  orders,           // Array of all user orders
  ordersLoading,    // Boolean indicating if orders are being fetched
  ordersError       // String containing any error message
} = useAuth();
```

## Available Order Functions

### Core Order Functions

#### `fetchOrders()`
Fetches all orders for the current user from the database.
```javascript
const { fetchOrders } = useAuth();

// Fetch orders manually
await fetchOrders();
```

#### `getOrderById(orderId)`
Retrieves a specific order by its ID.
```javascript
const { getOrderById } = useAuth();

// Get a specific order
const order = await getOrderById('order_id_here');
```

#### `createOrder(orderData)`
Creates a new order and automatically refreshes the orders list.
```javascript
const { createOrder } = useAuth();

const newOrder = {
  products: [
    {
      product: 'product_id',
      quantity: 2,
      price: 29.99
    }
  ],
  total: 59.98
};

const createdOrder = await createOrder(newOrder);
```

#### `updateOrder(orderId, updateData)`
Updates an existing order and updates the local state.
```javascript
const { updateOrder } = useAuth();

const updateData = {
  status: 'processing'
};

const updatedOrder = await updateOrder('order_id', updateData);
```

#### `deleteOrder(orderId)`
Deletes an order and removes it from local state.
```javascript
const { deleteOrder } = useAuth();

await deleteOrder('order_id');
```

### Utility Functions

#### `getOrderStatistics()`
Returns statistics about the user's orders.
```javascript
const { getOrderStatistics } = useAuth();

const stats = getOrderStatistics();
// Returns: {
//   total: 10,
//   pending: 2,
//   processing: 3,
//   shipped: 2,
//   delivered: 2,
//   cancelled: 1
// }
```

#### `getOrdersByStatus(status)`
Filters orders by a specific status.
```javascript
const { getOrdersByStatus } = useAuth();

const pendingOrders = getOrdersByStatus('pending');
const deliveredOrders = getOrdersByStatus('delivered');
const allOrders = getOrdersByStatus('all'); // Returns all orders
```

#### `sortOrders(orders, sortBy)`
Sorts orders by various criteria.
```javascript
const { sortOrders } = useAuth();

const sortedOrders = sortOrders(orders, 'newest'); // Options: 'newest', 'oldest', 'total-high', 'total-low', 'status'
```

#### `filterOrders(orders, filters)`
Advanced filtering with multiple criteria.
```javascript
const { filterOrders } = useAuth();

const filters = {
  status: 'pending',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  minTotal: 50,
  maxTotal: 200
};

const filteredOrders = filterOrders(orders, filters);
```

#### `refreshOrders()`
Manually refreshes the orders data from the server.
```javascript
const { refreshOrders } = useAuth();

await refreshOrders();
```

## Usage Examples

### Basic Orders Page
```javascript
import React from 'react';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { 
    orders, 
    ordersLoading, 
    ordersError, 
    getOrderStatistics 
  } = useAuth();

  if (ordersLoading) return <div>Loading orders...</div>;
  if (ordersError) return <div>Error: {ordersError}</div>;

  const stats = getOrderStatistics();

  return (
    <div>
      <h1>My Orders ({stats.total})</h1>
      {orders.map(order => (
        <div key={order._id}>
          <h3>Order #{order._id.slice(-8)}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
};
```

### Order Creation
```javascript
import React from 'react';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { createOrder } = useAuth();

  const handlePlaceOrder = async (cartItems) => {
    try {
      const orderData = {
        products: cartItems.map(item => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };

      const newOrder = await createOrder(orderData);
      console.log('Order created:', newOrder);
      // Redirect to order confirmation or orders page
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <button onClick={() => handlePlaceOrder(cartItems)}>
      Place Order
    </button>
  );
};
```

### Order Management Dashboard
```javascript
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderDashboard = () => {
  const { 
    orders, 
    getOrderStatistics, 
    getOrdersByStatus, 
    sortOrders,
    updateOrder 
  } = useAuth();
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const stats = getOrderStatistics();
  const filteredOrders = getOrdersByStatus(statusFilter);
  const sortedOrders = sortOrders(filteredOrders, sortBy);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  return (
    <div>
      <div className="stats">
        <div>Total: {stats.total}</div>
        <div>Pending: {stats.pending}</div>
        <div>Delivered: {stats.delivered}</div>
      </div>
      
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="delivered">Delivered</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="total-high">Highest Total</option>
      </select>
      
      {sortedOrders.map(order => (
        <div key={order._id}>
          <h3>Order #{order._id.slice(-8)}</h3>
          <p>Status: {order.status}</p>
          <select 
            value={order.status} 
            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};
```

### Order Summary Widget
```javascript
import React from 'react';
import { useAuth } from '../context/AuthContext';

const OrderSummaryWidget = () => {
  const { orders, getOrderStatistics } = useAuth();
  const stats = getOrderStatistics();

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.total, 0);
  };

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="stats">
        <div>Total Orders: {stats.total}</div>
        <div>Total Spent: ${getTotalSpent().toFixed(2)}</div>
        <div>Pending: {stats.pending}</div>
        <div>Delivered: {stats.delivered}</div>
      </div>
    </div>
  );
};
```

## Automatic Behavior

### Order Fetching
- Orders are automatically fetched when a user logs in
- Orders are cleared when a user logs out
- Orders are refreshed after creating a new order

### State Updates
- Local state is automatically updated when orders are created, updated, or deleted
- Loading states are managed automatically
- Error states are handled and can be displayed to users

## Error Handling

### Common Error Scenarios
```javascript
const { ordersError, refreshOrders } = useAuth();

if (ordersError) {
  return (
    <div className="error-container">
      <p>Error loading orders: {ordersError}</p>
      <button onClick={refreshOrders}>Try Again</button>
    </div>
  );
}
```

### Network Errors
The AuthContext automatically handles:
- Network connectivity issues
- Authentication token expiration
- Server errors
- Invalid order data

## Performance Considerations

### Optimizations
- Orders are cached in local state
- Automatic cleanup on logout
- Efficient filtering and sorting
- Minimal re-renders with React state management

### Best Practices
1. **Use loading states**: Always check `ordersLoading` before rendering
2. **Handle errors gracefully**: Display user-friendly error messages
3. **Optimize re-renders**: Use `useMemo` for expensive calculations
4. **Batch updates**: Group multiple order operations when possible

## Integration with Existing Components

### Profile Page Integration
```javascript
// In profile.jsx or similar
import OrderSummary from '../components/OrderSummary';

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <div className="row">
        <div className="col-md-8">
          {/* Profile content */}
        </div>
        <div className="col-md-4">
          <OrderSummary showDetails={true} />
        </div>
      </div>
    </div>
  );
};
```

### Header Integration
```javascript
// Show order count in header
const Header = () => {
  const { getOrderStatistics } = useAuth();
  const stats = getOrderStatistics();
  
  return (
    <header>
      <nav>
        <Link to="/orders">
          Orders ({stats.total})
        </Link>
      </nav>
    </header>
  );
};
```

## Testing

### Unit Testing
```javascript
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../context/AuthContext';

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

test('should fetch orders', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  
  await result.current.fetchOrders();
  
  expect(result.current.orders).toHaveLength(2);
  expect(result.current.ordersLoading).toBe(false);
});
```

### Integration Testing
```javascript
test('should create and update orders', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  
  const newOrder = await result.current.createOrder({
    products: [{ product: '123', quantity: 1, price: 10 }],
    total: 10
  });
  
  expect(newOrder).toBeDefined();
  
  const updatedOrder = await result.current.updateOrder(newOrder._id, {
    status: 'processing'
  });
  
  expect(updatedOrder.status).toBe('processing');
});
```

This integration provides a robust, scalable solution for managing orders throughout your e-commerce application with minimal boilerplate code and excellent developer experience. 