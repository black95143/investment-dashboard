import React from 'react';
import styles from './IndexCloseInfo.module.css';
import { Col } from 'react-bootstrap';

const Card = (props) => {
  if (props.data && props.data.close.spread) {
    return (
      <Col sm={12} md={6} lg={4} xl={3} xxl={3} className={styles.bar}>
        <div className={styles.bar_left_side}>
          <div className={styles.bar_icon}>{props.data.info.iconText}</div>
        </div>
        <div className={styles.bar_right_side}>
          <p className={styles.bar_text}>{props.data.info.name}</p>
          <div className={styles.bar_data_group}>
            <p className={`${styles.bar_data} ${props.data.close.spread > 0 && props.data.close.spread !== 0 ? styles.red_text : styles.green_text}`}>{props.data.close.price}</p>
            <p className={styles.bar_data}>|</p>
            <p className={`${styles.bar_data} ${props.data.close.spread > 0 && props.data.close.spread !== 0 ? styles.red_text : styles.green_text}`}>{props.data.close.spread}</p>
            <p className={styles.bar_data}>|</p>
            <p className={`${styles.bar_data} ${props.data.close.spread > 0 && props.data.close.spread !== 0 ? styles.red_text : styles.green_text}`}>
              {
                Math.round(props.data.close.spread * 10000 / (props.data.close.price - props.data.close.spread)) / 100
              }
              %
            </p>
          </div>
        </div>
      </Col >
    )
  } else if (props.data && !props.data.close.spread) {
    return (
      <Col sm={12} md={6} lg={4} xl={3} xxl={3} className={styles.bar}>
        <div className={styles.bar_left_side}>
          <div className={styles.bar_icon}>{props.data.info.iconText}</div>
        </div>
        <div className={styles.bar_right_side}>
          <p className={styles.bar_text}>{props.data.info.name}</p>
          <div className={styles.bar_data_group}>
            <p className={`${styles.bar_data} ${props.data.close.price > 0 && props.data.close.price !== 0 ? styles.red_text : styles.green_text}`}>{+(Math.round(props.data.close.price / 100000000 + "e+2") + "e-2")}億</p>
          </div>
        </div>
      </Col >
    )
  } else {
    return <p>No data</p>
  }
};

export default Card;