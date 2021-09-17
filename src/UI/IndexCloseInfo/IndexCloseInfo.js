import React from 'react';
import styles from './IndexCloseInfo.module.css';
import { Col } from 'react-bootstrap';

const Card = () => {
  return (
    <Col sm={12} md={6} lg={4} xl={3} xxl={3} className={styles.bar}>
      <div className={styles.bar_left_side}>
        <div className={styles.bar_icon}>加</div>
      </div>
      <div className={styles.bar_right_side}>
        <p className={styles.bar_text}>台股加權指數</p>
        <div className={styles.bar_data_group}>
          <p className={styles.bar_data}>17300</p>
          <p className={styles.bar_data}>|</p>
          <p className={styles.bar_data_change}>-70</p>
          <p className={styles.bar_data}>|</p>
          <p className={styles.bar_data_change}>-0.3%</p>
        </div>
      </div>
    </Col>
  )
};

export default Card;