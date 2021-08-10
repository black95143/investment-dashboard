import React from 'react';
import styles from './Chart.module.css';
import { Row, Col } from 'react-bootstrap';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import dummyData from './dummyData.json';

const chartElementInfo = () => {
  const chartData = [];
  dummyData.TREAST.data.observations.forEach(ob => {
    chartData.push([new Date(ob.date).getTime(), Number(ob.value)]);
  });

  return {
    document: dummyData.TREAST.document,
    source: dummyData.TREAST.source,
    updated: dummyData.TREAST.latest_released_date,
    options: {
      title: {
        text: dummyData.TREAST.title
      },
      series: [
        {
          name: dummyData.TREAST.title,
          data: chartData
        }
      ],
      xAxis: {
        type: "datetime",
        title: {
          text: 'Date'
        }
      }
    }
  }
};

const Charts = () => {
  return (
    <Row className={styles.charts}>
      <Col sm={12} md={6} lg={4} className={styles.chartItem}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={chartElementInfo().options}
        />
        <div className={styles.chartInfo}>
          <p className={styles.source}>source: {chartElementInfo().source}</p>
          <p className={styles.date}>updated: {chartElementInfo().updated}</p>
        </div>
        <div>
          <p className={styles.document}>{chartElementInfo().document}</p>
        </div>
      </Col>
    </Row>
  )
};

export default Charts;