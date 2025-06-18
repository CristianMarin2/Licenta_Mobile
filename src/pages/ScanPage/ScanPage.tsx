import React from 'react';
import useScanPageLogic from './ScanPage.logic';
import ScanPanel from './ScanPanel';
import ImageUploadModal from '../../components/ImageUploadModal';

const ScanPage: React.FC = () => {
  const {
    showUploadModal,
    setShowUploadModal,
    handleScan,
    ...rest
  } = useScanPageLogic();

  return (
    <>
      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onScan={handleScan}
        />
      )}
      <ScanPanel
        {...rest}
        handleScan={handleScan}
      />
    </>
  );
};

export default ScanPage;
