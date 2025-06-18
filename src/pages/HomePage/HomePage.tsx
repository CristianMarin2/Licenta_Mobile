import React from 'react';
import useHomePageLogic from './HomePage.logic';
import HomePanel from './HomePanel';

const HomePage: React.FC = () => {
  const logic = useHomePageLogic();
  return <HomePanel {...logic} />;
};

export default HomePage;
