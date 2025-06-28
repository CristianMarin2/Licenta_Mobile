import React from 'react';
import useCartPageLogic from './CartPage.logic';
import CartPanel from './CartPanel';

const CartPage: React.FC = () => {
  const logic = useCartPageLogic();
  return <CartPanel {...logic} />;
};

export default CartPage;
