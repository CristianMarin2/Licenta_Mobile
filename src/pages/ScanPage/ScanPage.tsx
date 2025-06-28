import React from 'react';
import useScanPageLogic from './ScanPage.logic';
import ScanPanel from './ScanPanel';
import BarcodeScanner from '../../components/BarcodeScanner';

const ScanPage: React.FC = () => {
  const {
    handleScan,
    product,
    loading, 
    ...rest
  } = useScanPageLogic();

  return (
    <>
      {}
      {!product && !loading && (
        <BarcodeScanner onScan={handleScan} />
      )}

      <ScanPanel
        {...rest}
        product={product}
        loading={loading}
        handleScan={handleScan}
      />
    </>
  );
};

export default ScanPage;
