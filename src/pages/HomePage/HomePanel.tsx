import React from 'react';
import './HomePanel.css';

interface HomePanelProps {
  goToScan: () => void;
  goToCart: () => void;
}

const HomePanel: React.FC<HomePanelProps> = ({ goToScan, goToCart }) => {
  return (
     <div className="home-panel">
      <h1>Scanare produse</h1>
      <button onClick={goToScan} style={{ fontSize: '1.5rem', margin: '1rem' }}>
        🔍 Scanează
      </button>
      <button onClick={goToCart} style={{ fontSize: '1.5rem', margin: '1rem' }}>
        🧺 Vezi coș
      </button>
    </div>
  );
};

export default HomePanel;
