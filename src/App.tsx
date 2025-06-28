import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage/HomePage';
import ScanPage from './pages/ScanPage/ScanPage';
import CartPage from './pages/CartPage/CartPage';

const App: React.FC = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
