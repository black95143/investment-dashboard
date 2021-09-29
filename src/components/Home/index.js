import React from 'react';
import Title from './Title/Title';
import TaiwanStock from './TaiwanStock/TaiwanStock';
import USStock from './USStock/USStock';

const Home = () => {
  return (
    <React.Fragment>
      <Title />
      <TaiwanStock />
      <USStock />
    </React.Fragment>
  );
};

export default Home;