import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../components/BarcodeScanner';
import { useCart } from '../context/CartContext';
import { fetchProduct } from '../utils/api';
import { ScannedProduct } from '../types/Product';

const ScanPage: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [scannedBarcode, setScannedBarcode] = useState('');
  const [product, setProduct] = useState<ScannedProduct | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // ✅ pentru resetare input

  const handleScan = async (barcode: string) => {
    setLoading(true);
    setScannedBarcode(barcode);
    setProduct(null);
    setError('');

    const found = await fetchProduct(barcode);
    if (found) {
      setProduct(found);
    } else {
      setError('Produsul nu a fost găsit în baza de date.');
    }

    setLoading(false);
  };

  const handleAddToCart = () => {
    if (product && product.quantity > 0) {
      addToCart(product);
      setProduct(null);
      setScannedBarcode('');
      setError('');

      // ✅ forțăm resetarea inputului <input type="file" /> din BarcodeScanner
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  const handleQuantityChange = (qty: number) => {
    if (product && qty > 0) {
      setProduct({ ...product, quantity: qty });
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ⬅️ Înapoi
      </button>

      <h2>Scanează un produs</h2>

      <BarcodeScanner onScan={handleScan} />

      {loading && <p>Se caută produsul...</p>}

      {scannedBarcode && !loading && (
        <p style={{ color: 'green' }}>
          ✅ Cod scanat: <strong>{scannedBarcode}</strong>
        </p>
      )}

      {product && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>{product.name}</strong> - {product.price.toFixed(2)} lei</p>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <label style={{ marginRight: '0.5rem' }}>Cantitate:</label>
            <button onClick={() => handleQuantityChange(product.quantity - 1)} disabled={product.quantity <= 1}>
              ➖
            </button>
            <input
              type="number"
              min={1}
              value={product.quantity}
              onChange={(e) => {
                const qty = parseInt(e.target.value);
                if (!isNaN(qty)) handleQuantityChange(qty);
              }}
              style={{ width: '60px', textAlign: 'center', margin: '0 0.5rem' }}
            />
            <button onClick={() => handleQuantityChange(product.quantity + 1)}>
              ➕
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleAddToCart}>Adaugă în coș</button>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}
    </div>
  );
};

export default ScanPage;
