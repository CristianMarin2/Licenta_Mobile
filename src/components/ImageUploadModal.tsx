import React, { useState } from 'react';
import './ImageUploadModal.css';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useNavigate } from 'react-router-dom';

interface ImageUploadModalProps {
  onClose: () => void;
  onScan: (barcode: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onClose, onScan }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✨ pentru redirect

  const handleSubmit = async () => {
    if (!file) {
      setError('Te rog selectează o imagine.');
      return;
    }

    const codeReader = new BrowserMultiFormatReader();
    setLoading(true);
    setError('');

    try {
      const result = await codeReader.decodeFromImageUrl(URL.createObjectURL(file));
      const code = result.getText();
      onScan(code);
      onClose();
    } catch (err) {
      setError('Nu s-a putut citi niciun cod de bare din imagine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close-button" onClick={handleCloseAndRedirect}>✖</button>

        <h2>Scanează codul de bare</h2>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Se scanează...' : 'Scanează'}
        </button>
        {error && <p className="modal-error">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploadModal;
