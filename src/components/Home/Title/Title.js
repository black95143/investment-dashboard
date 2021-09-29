import React from 'react';
import styles from './Title.module.css';

const Title = () => {
  return (
    <React.Fragment>
      <div className={styles.titleBack}>
        <p className={styles.title}>最新資訊</p>
      </div>
    </React.Fragment>
  );
};

export default Title;