import React, { useState } from 'react';
import Title from './Title/Title';
import KBarChart from './KBarChart/KBarChart';

const TaiwanStockTA = () => {
  const [stockNo, setStockNo] = useState('2330');
  const stockNoChangeHandler = (enteredStockNo) => {
    setStockNo(enteredStockNo);
  };

  return (
    <React.Fragment>
      <Title onStockNoChange={stockNoChangeHandler} />
      <KBarChart stockNo={stockNo} />
    </React.Fragment>
  );
};

export default TaiwanStockTA;