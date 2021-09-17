import React from 'react';
import Title from './Title/Title';
import TaiwanStock from './TaiwanStock/TaiwanStock';
import USStock from './USStock/USStock';
import GlobalStock from './GlobalStock/GlobalStock';

const Home = () => {
  return (
    <React.Fragment>
      <Title />
      <TaiwanStock />
      <USStock />
      <GlobalStock />
    </React.Fragment>
  );
};

export default Home;