import React from 'react';
import styles from './GlobalStock.module.css';
import { Row } from 'react-bootstrap';
import IndexCloseInfo from '../../../UI/IndexCloseInfo/IndexCloseInfo';

const TaiwanStock = () => {
  return (
    <React.Fragment>
      <div className={styles.frame}>
        <div className={styles.left_side}>
          <div className={styles.icon}>GL</div>
        </div>
        <div className={styles.right_side}>
          <p className={styles.title}>全球股市</p>
          <Row className={styles.bar_group}>
            <IndexCloseInfo />
            <IndexCloseInfo />
            <IndexCloseInfo />
            <IndexCloseInfo />
          </Row>
        </div>

      </div>
    </React.Fragment>
  )
};

export default TaiwanStock;