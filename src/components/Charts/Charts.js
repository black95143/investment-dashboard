import React from 'react';
import styles from './Chart.module.css';
import { Row, Col } from 'react-bootstrap';
import dummyChart from './dummyChart.jpg'

const Charts = () => {
  const chartData = [
    {
      title: 'Chart1',
      document: 'Consectetur ullamco aliquip et irure do proident ipsum minim nostrud occaecat est mollit.Irure minim qui adipisicing mollit id ex esse enim magna sint eiusmod ad.Culpa aliqua sint exercitation aute sunt reprehenderit incididunt deserunt quis enim occaecat deserunt amet.'
    },
    {
      title: 'Chart2',
      document: 'Consectetur ullamco aliquip et irure do proident ipsum minim nostrud occaecat est mollit.Irure minim qui adipisicing mollit id ex esse enim magna sint eiusmod ad.Culpa aliqua sint exercitation aute sunt reprehenderit incididunt deserunt quis enim occaecat deserunt amet.'
    },
    {
      title: 'Chart3',
      document: 'Consectetur ullamco aliquip et irure do proident ipsum minim nostrud occaecat est mollit.Irure minim qui adipisicing mollit id ex esse enim magna sint eiusmod ad.Culpa aliqua sint exercitation aute sunt reprehenderit incididunt deserunt quis enim occaecat deserunt amet.'
    }
  ]

  return <Row className={styles.charts}>
    {chartData.map((e) => (
      <Col sm={12} md={6} lg={4} className={styles.chartItem}>
        <h1 className={styles.title}>{e.title}</h1>
        <img src={dummyChart} className={styles.chart} alt="chart" />
        <div className={styles.chartInfo}>
          <p className={styles.source}>source: xxx</p>
          <p className={styles.date}>updated: xxx</p>
        </div>
        <div>
          <p className={styles.document}>{e.document}</p>
        </div>
      </Col>
    ))}
  </Row>
};

export default Charts;