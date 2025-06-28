import React from 'react';
import { ScannedProduct } from '../types/Product';
import GenerateQR from './GenerateQR';

interface Props {
  products: ScannedProduct[];
  onClose: () => void;
}

const QRModal: React.FC<Props> = ({ products, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        textAlign: 'center'
      }}>
        <h3>Cod QR pentru POS</h3>
        <GenerateQR products={products} />
        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Închide
        </button>
      </div>
    </div>
  );
};

export default QRModal;
