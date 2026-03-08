import React, { createContext, useContext, useState } from "react";
import Toast from "../common/toast"; 

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if item already exists
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new item
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Success Acknowledgement
    setToastMsg(`${product.title.substring(0, 20)}... added to cart`);
    setShowToast(true);
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, removeItem, increaseQuantity, decreaseQuantity }}>
      {children}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};