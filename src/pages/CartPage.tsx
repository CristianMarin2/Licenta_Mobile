import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QRModal from '../components/QRModal';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const handleQuantityChange = (barcode: string, qty: number) => {
    if (qty >= 1) {
      updateQuantity(barcode, qty);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ⬅️ Înapoi
      </button>

      <h2>Coș de produse</h2>

      {cart.length === 0 && <p>Coșul este gol.</p>}

      {cart.map((p) => (
        <div key={p.barcode} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
          <strong>{p.name}</strong> — {p.price.toFixed(2)} lei / buc
          <br />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.3rem' }}>
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
              style={{ width: '60px', textAlign: 'center', margin: '0 0.5rem' }}
            />
            <button onClick={() => handleQuantityChange(p.barcode, p.quantity + 1)}>
              ➕
            </button>

            <button
              onClick={() => removeFromCart(p.barcode)}
              style={{ marginLeft: '1rem', color: 'red' }}
            >
              🗑️ Șterge
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <button
          onClick={() => setShowQR(true)}
          style={{ marginTop: '1.5rem', fontSize: '1.2rem', padding: '0.5rem 1rem' }}
        >
          📦 Generează cod QR
        </button>
      )}

      {showQR && <QRModal products={cart} onClose={() => setShowQR(false)} />}
    </div>
  );
};

export default CartPage;
