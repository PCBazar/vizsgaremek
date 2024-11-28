import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const username = localStorage.getItem('username') || "";
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(`cart_${username}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      return existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.stock_quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItemFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};