import React, { useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface Props {
  onScan?: (barcode: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({ onScan }) => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('Nu a fost selectată nicio imagine.');
      return;
    }

    const codeReader = new BrowserMultiFormatReader();
    setLoading(true);
    setScannedCode(null);
    setError(null);

    try {
      const result = await codeReader.decodeFromImageUrl(URL.createObjectURL(file));
      const code = result.getText();
      setScannedCode(code);
      if (onScan) onScan(code);
    } catch (err) {
      console.error('Eroare la scanare:', err);
      setError('Nu s-a putut citi niciun cod de bare din imagine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Încarcă o imagine cu cod de bare</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {loading && <p style={{ color: '#333', marginTop: '1rem' }}>⏳ Se procesează imaginea...</p>}

      {scannedCode && !loading && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          ✅ Cod scanat: <strong>{scannedCode}</strong>
        </p>
      )}

      {error && !loading && (
        <p style={{ color: 'red', marginTop: '1rem' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default BarcodeScanner;
