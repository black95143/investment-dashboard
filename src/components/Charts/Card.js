import React from 'react';
import styles from './Card.module.css';
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

const Card = (props) => {
  const chartOption = {
    title: {
      text: props.item.title
    },
    series: [
      {
        name: props.item.title,
        data: fetchData(props.item.series_id)
      }
    ],
    xAxis: {
      type: "datetime",
      title: {
        text: 'Date'
      }
    }
  };

  return (
    <div className={styles.chartFrame}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chartOption}
      />
      <div className={styles.chartInfo}>
        <p className={styles.source}>source: {props.item.source}</p>
        <p className={styles.date}>updated: {props.item.updated}</p>
      </div>
      <div>
        <p className={styles.document}>{props.item.document}</p>
      </div>
    </div>
  )
}

export default Card;