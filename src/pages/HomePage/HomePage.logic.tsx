import { useNavigate } from 'react-router-dom';

const useHomePageLogic = () => {
  const navigate = useNavigate();

  return {
    goToScan: () => navigate('/scan'),
    goToCart: () => navigate('/cart'),
  };
};

export default useHomePageLogic;
