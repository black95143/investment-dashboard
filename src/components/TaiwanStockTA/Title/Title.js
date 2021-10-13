import React, { useState } from 'react';
import styles from './Title.module.css';

const Title = (props) => {
  const [enteredStockNo, setEnteredStockNo] = useState('');
  const stockNoChangeHandler = (event) => {
    setEnteredStockNo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onStockNoChange(enteredStockNo);
  };

  return (
    <React.Fragment>
      <div className={styles.titleBack}>
        <form onSubmit={submitHandler} className={styles.inputSection}>
          <p className={styles.title}>請輸入</p>
          <input 
            placeholder="股票代碼" 
            type="text" 
            className={styles.input} 
            value={enteredStockNo} 
            onChange={stockNoChangeHandler}  
          />
          <button type='submit' className={styles.button}>送出</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Title;