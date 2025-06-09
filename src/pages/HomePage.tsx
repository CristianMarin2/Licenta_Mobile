import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Scanare produse</h1>
      <button onClick={() => navigate('/scan')} style={{ fontSize: '1.5rem', margin: '1rem' }}>
        🔍 Scanează
      </button>
      <button onClick={() => navigate('/cart')} style={{ fontSize: '1.5rem', margin: '1rem' }}>
        🧺 Vezi coș
      </button>
    </div>
  );
};

export default HomePage;
