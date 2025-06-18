import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { fetchProduct } from '../../utils/api';
import { ScannedProduct } from '../../types/Product';

const useScanPageLogic = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [scannedBarcode, setScannedBarcode] = useState('');
  const [product, setProduct] = useState<ScannedProduct | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(true); // 🎯 pornește cu modalul deschis

  const inputRef = useRef<HTMLInputElement>(null);

  // 🔍 Caută produsul după codul scanat
  useEffect(() => {
    const searchProduct = async () => {
      if (!scannedBarcode) return;
      setLoading(true);
      setProduct(null);
      setError('');

      const found = await fetchProduct(scannedBarcode);
      if (found) {
        setProduct(found);
      } else {
        setError('Produsul nu a fost găsit în baza de date.');
      }
      setLoading(false);
    };

    searchProduct();
  }, [scannedBarcode]);

  // 📥 Primește codul din scanner
  const handleScan = (barcode: string) => {
    setScannedBarcode(barcode);
    setShowUploadModal(false); // ✅ ascunde modalul după scanare
  };

  // ➕ Adaugă produs în coș și resetează starea
  const handleAddToCart = () => {
    if (product && product.quantity > 0) {
      addToCart(product);
      setProduct(null);
      setScannedBarcode('');
      setError('');
      setShowUploadModal(true); // 🔁 redeschide modalul pentru următorul produs

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  // 🔁 Modifică cantitatea produsului curent
  const handleQuantityChange = (qty: number) => {
    if (product && qty > 0) {
      setProduct({ ...product, quantity: qty });
    }
  };

  return {
    navigate,
    scannedBarcode,
    product,
    error,
    loading,
    handleScan,
    handleAddToCart,
    handleQuantityChange,
    showUploadModal,
    setShowUploadModal,
  };
};

export default useScanPageLogic;
