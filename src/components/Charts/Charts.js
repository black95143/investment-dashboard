import React from 'react';
import styles from './Chart.module.css';
import { Row, Col } from 'react-bootstrap';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import observations from '../../data/observations.json';

const fetchData = (series_id) => {
  let data = [];
  observations[series_id].forEach(ob => {
    data.push([new Date(ob.date).getTime(), Number(ob.value)]);
  });
  return data
};

const Charts = (props) => {
  let chartData = [];
  props.chartCollections.forEach(collection => {
    chartData.push({
      id: collection.id,
      document: collection.document,
      source: collection.source,
      updated: collection.latest_released_date,
      options: {
        title: {
          text: collection.title
        },
        series: [
          {
            name: collection.title,
            data: fetchData(collection.series_id)
          }
        ],
        xAxis: {
          type: "datetime",
          title: {
            text: 'Date'
          }
        }
      }
    })
  });

  return (
    <Row className={styles.charts}>
      {chartData.map((e) => (
        <Col sm={12} md={6} lg={4} className={styles.chartItem} key={e.id}>
          <div className={styles.chartFrame}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={e.options}
            />
            <div className={styles.chartInfo}>
              <p className={styles.source}>source: {e.source}</p>
              <p className={styles.date}>updated: {e.updated}</p>
            </div>
            <div>
              <p className={styles.document}>{e.document}</p>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  )
};

export default Charts;