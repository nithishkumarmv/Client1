// filepath: c:\Users\nithi\Desktop\project\Client1-1\Client1-1\FRONTEND\gym-store-frontend\src\context\CartContext.js
import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const uniqueItem = { ...item, cartId: uuidv4() }; // Add a unique cartId
    setCartItems((prevItems) => [...prevItems, uniqueItem]);

    // Save to database (optional)
    // axios.post('http://localhost:5000/api/cart', uniqueItem);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));

    // Remove from database (optional)
    // axios.delete(`http://localhost:5000/api/cart/${cartId}`);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};