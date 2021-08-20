import React, { useEffect, useState, useCallback } from 'react';
import styles from './Card.module.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

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

  const fetchData = useCallback((series_id) => {
    fetch(`${process.env.REACT_APP_PROXY_SERVER_URL}/series/observations?series_id=${series_id}&api_key=${process.env.REACT_APP_API_KEY}&file_type=json`, {
      headers: {
        'Target-URL': 'https://api.stlouisfed.org/fred'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        let data1 = [];
        data.observations.forEach(ob => {
          data1.push([new Date(ob.date).getTime(), Number(ob.value)]);
        });
        setChartOption((prevOption) => {
          return {
            ...prevOption,
            series: [
              {
                name: prevOption.series[0].name,
                data: data1
              }
            ]
          }
        });
      });
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