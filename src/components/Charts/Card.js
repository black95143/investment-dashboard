import React, { useEffect, useState } from 'react';
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
    }
  });

  const fetchData = (series_id) => {
    fetch(`https://proxy-server-fred.herokuapp.com/my-service/series/observations?series_id=${series_id}&api_key=${process.env.REACT_APP_API_KEY}&file_type=json`, {
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
                name: props.item.title,
                data: data1
              }
            ]
          }
        })
      });
  };

  useEffect(() => {
    fetchData(props.item.series_id);
  }, []);

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