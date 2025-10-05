import React, { useState } from 'react';
import { FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { addToCart } from '../utils/cartUtils';
import './AddToCartButton.css';

const AddToCartButton = ({ product, disabled = false, className = '', size = 'medium' }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (disabled || isAdding) return;

    setIsAdding(true);
    
    try {
      const success = addToCart(product, 1);
      
      if (success) {
        // Trigger a custom event to notify other components about cart changes
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        alert(`${product.name} added to cart!`);
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonClass = () => {
    let baseClass = 'add-to-cart-btn';
    if (className) baseClass += ` ${className}`;
    if (size) baseClass += ` ${size}`;
    if (disabled) baseClass += ' disabled';
    if (isAdding) baseClass += ' loading';
    return baseClass;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      aria-label={`Add ${product.name} to cart`}
    >
      {isAdding ? (
        <>
          <FaSpinner className="spinner" />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <FaShoppingCart />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton; 