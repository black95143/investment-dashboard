import React from 'react';
import styles from './Title.module.css';

const Title = () => {
  return (
    <React.Fragment>
      <p className={styles.title}>全球股市指數 - 2021/09/15</p>
    </React.Fragment>
  );
};

export default Title;