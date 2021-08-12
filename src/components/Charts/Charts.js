import React from 'react';
import styles from './Charts.module.css';
import { Row, Col } from 'react-bootstrap';
import Card from './Card';

const Charts = (props) => {
  return (
    <Row className={styles.charts}>
      {props.charts.map((e) => (
        <Col sm={12} md={12} lg={6} xxl={4} className={styles.chartItem} key={e.id}>
          <Card item={e} />
        </Col>
      ))}
    </Row>
  )
};

export default Charts;