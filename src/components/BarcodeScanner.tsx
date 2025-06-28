import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { Result } from '@zxing/library';

interface Props {
  onScan: (barcode: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  const startScanner = async () => {
  if (!videoRef.current) {
    setError('Camera video nu este gata încă.');
    return;
  }

  try {
    const codeReader = new BrowserMultiFormatReader();
    const controls = await codeReader.decodeFromVideoDevice(
      undefined,
      videoRef.current,
      (result: Result | undefined) => {
        if (result) {
          const code = result.getText();
          onScan(code);
          scannerRef.current?.stop();
          setCameraActive(false);
        }
      }
    );

    scannerRef.current = controls;
    setCameraActive(true);
    setError('');
  } catch (err) {
    console.error(err);
    setError('Nu s-a putut accesa camera. Te rugăm să permiți accesul în browser.');
  }
};


  useEffect(() => {
    return () => {
      scannerRef.current?.stop();
    };
  }, []);

  return (
  <div style={{ textAlign: 'center' }}>
    {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

    {!cameraActive && (
      <button onClick={startScanner} style={{ padding: '1rem', fontSize: '1.2rem' }}>
        📷 Activează camera
      </button>
    )}

    <video
      ref={videoRef}
      style={{
        width: '100%',
        height: 'auto',
        marginTop: cameraActive ? '1rem' : 0,
        display: cameraActive ? 'block' : 'none',
      }}
    />
  </div>
);
};

export default BarcodeScanner;
