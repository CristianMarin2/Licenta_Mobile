import React from 'react';
import './ScanPanel.css';
import BarcodeScanner from '../../components/BarcodeScanner';
import { ScannedProduct } from '../../types/Product';

interface ScanPanelProps {
  navigate: (path: string) => void;
  scannedBarcode: string;
  product: ScannedProduct | null;
  error: string;
  loading: boolean;
  handleScan: (barcode: string) => void;
  handleAddToCart: () => void;
  handleQuantityChange: (qty: number) => void;
}

const ScanPanel: React.FC<ScanPanelProps> = ({
  navigate,
  scannedBarcode,
  product,
  error,
  loading,
  handleAddToCart,
  handleQuantityChange,
}) => {
  return (
    <div className="scan-panel">
      <button className="back-button" onClick={() => navigate('/')}>
        ⬅️ Înapoi
      </button>

      <h2>Scanează un produs</h2>

      {loading && <p className="loading-message">Se caută produsul...</p>}

      {scannedBarcode && !loading && (
        <p className="success-message">
          Cod scanat: <strong>{scannedBarcode}</strong>
        </p>
      )}

      {product && (
        <div className="product-info">
          <p><strong>{product.name}</strong> - {product.price.toFixed(2)} lei</p>

          <div className="quantity-controls">
            <label>Cantitate:</label>
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
            />
            <button onClick={() => handleQuantityChange(product.quantity + 1)}>
              ➕
            </button>
          </div>

          <div className="add-button-wrapper">
            <button onClick={handleAddToCart}>Adaugă în coș</button>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ScanPanel;
