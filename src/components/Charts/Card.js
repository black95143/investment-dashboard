import React, { useEffect, useState, useCallback } from 'react';
import styles from './Card.module.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import fredAPI from './fredAPI';
// import { data } from 'jquery';

const Card = (props) => {
  const [chartOption, setChartOption] = useState({
    title: {
      text: props.item.title
    },
    xAxis: {
      type: "datetime",
      title: {
        text: 'Date'
      }
    },
    series: [
      {
        name: props.item.title
      }
    ]
  });

  const fetchData = useCallback(async (series_id) => {
    const seriesData = await fredAPI(series_id);
    setChartOption((prevOption) => {
      return {
        ...prevOption,
        series: [
          {
            name: prevOption.series[0].name,
            data: seriesData
          }
        ]
      }
    })
  }, []);

  useEffect(() => {
    fetchData(props.item.series_id);
  }, [fetchData, props]);

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