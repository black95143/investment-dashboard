import React from 'react';
import styles from './Title.module.css';

const Title = () => {
  return (
    <React.Fragment>
      <div className={styles.titleBack}>
        <div className={styles.inputSection}>
          <p className={styles.title}>請輸入</p>
          <input placeholder="股票代碼" type="text" className={styles.input} />
          <button className={styles.button}>送出</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Title;