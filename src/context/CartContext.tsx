import React, { createContext, useContext, useState } from 'react';
import { ScannedProduct } from '../types/Product';

interface CartContextType {
  cart: ScannedProduct[];
  addToCart: (product: ScannedProduct) => void;
  updateQuantity: (barcode: string, qty: number) => void;
  removeFromCart: (barcode: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ScannedProduct[]>([]);

  const addToCart = (product: ScannedProduct) => {
    setCart(prev => {
      const existing = prev.find(p => p.barcode === product.barcode);
      if (existing) {
        return prev.map(p =>
          p.barcode === product.barcode
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (barcode: string, qty: number) => {
    setCart(prev =>
      prev.map(p =>
        p.barcode === barcode ? { ...p, quantity: qty } : p
      )
    );
  };

  const removeFromCart = (barcode: string) => {
    setCart(prev => prev.filter(p => p.barcode !== barcode));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
