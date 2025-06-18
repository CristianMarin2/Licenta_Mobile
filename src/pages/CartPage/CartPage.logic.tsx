import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const useCartPageLogic = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const handleQuantityChange = (barcode: string, qty: number) => {
    if (qty >= 1) {
      updateQuantity(barcode, qty);
    }
  };

  return {
    cart,
    showQR,
    setShowQR,
    navigate,
    removeFromCart,
    handleQuantityChange,
  };
};

export default useCartPageLogic;
