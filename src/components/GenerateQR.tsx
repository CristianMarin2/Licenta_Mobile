import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { ScannedProduct } from '../types/Product';

interface Props {
  products: ScannedProduct[];
}

const GenerateQR: React.FC<Props> = ({ products }) => {
  const payload = products.map((p) => ({
    barcode: p.barcode,
    quantity: p.quantity,
  }));
  const qrValue = JSON.stringify(payload);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Cod QR pentru POS</h3>
      <QRCodeSVG value={qrValue} size={256} />
    </div>
  );
};

export default GenerateQR;
