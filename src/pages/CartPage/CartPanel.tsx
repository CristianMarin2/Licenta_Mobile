import React from 'react';
import './CartPanel.css';

import QRModal from '../../components/QRModal';
import { ScannedProduct } from '../../types/Product';

interface CartPanelProps {
  cart: ScannedProduct[];
  showQR: boolean;
  setShowQR: (val: boolean) => void;
  navigate: (path: string) => void;
  removeFromCart: (barcode: string) => void;
  handleQuantityChange: (barcode: string, qty: number) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  cart,
  showQR,
  setShowQR,
  navigate,
  removeFromCart,
  handleQuantityChange,
}) => {
  return (
    <div className="cart-panel">
      <button className="back-button" onClick={() => navigate('/')}>
        ⬅️ Înapoi
      </button>

      <h2>Coș de produse</h2>

      {cart.length === 0 && <p>Coșul este gol.</p>}

      {cart.map((p) => (
        <div key={p.barcode} className="cart-item">
          <strong>{p.name}</strong> — {p.price.toFixed(2)} lei / buc
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange(p.barcode, p.quantity - 1)} disabled={p.quantity <= 1}>
              ➖
            </button>
            <input
              type="number"
              min={1}
              value={p.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) handleQuantityChange(p.barcode, val);
              }}
            />
            <button onClick={() => handleQuantityChange(p.barcode, p.quantity + 1)}>
              ➕
            </button>
            <button className="delete-button" onClick={() => removeFromCart(p.barcode)}>
              🗑️ Șterge
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <button className="generate-button" onClick={() => setShowQR(true)}>
          📦 Generează cod QR
        </button>
      )}

      {showQR && <QRModal products={cart} onClose={() => setShowQR(false)} />}
    </div>
  );
};

export default CartPanel;
