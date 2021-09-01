import React, { useEffect, useState, useCallback } from 'react';
import styles from './Card.module.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import fredAPI from './fredAPI';
import { Col } from 'react-bootstrap';

const Card = (props) => {
  const [chartOption, setChartOption] = useState({
    title: {
      text: props.data.title
    },
    xAxis: {
      type: "datetime",
      title: {
        text: 'Date'
      }
    },
    series: [
      {
        name: props.data.title
      }
    ],
    chart: {
      events: {
        load() {
          this.showLoading();
          setTimeout(this.hideLoading.bind(this), 2000)
        }
      }
    }
  });

  const fetchData = useCallback(async (series_id) => {
    try {
      let seriesData, fetchDate
      // get data from cachedData
      if (props.cachedData.current[series_id] &&
        (Date.now() - (new Date(props.cachedData.current[series_id]["fetchDate"])).getTime() < 57600000)
      ) {
        seriesData = props.cachedData.current[series_id]["seriesData"]
      } else {
        // get data from api
        [seriesData, fetchDate] = await fredAPI(series_id);
        props.onSaveCachedData(series_id, seriesData, fetchDate)
      }
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
    } catch (error) {
      console.log(error)
    }
  }, [props]);

  useEffect(() => {
    fetchData(props.data.series_id);
  }, [fetchData, props]);

  return (
    <Col sm={12} md={12} lg={6} xxl={4} className={styles.chartItem} key={props.data.id}>
      <div className={styles.chartFrame}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={chartOption}
        />
        <div className={styles.chartInfo}>
          <p className={styles.source}>source: {props.data.source}</p>
          <p className={styles.date}>updated: {props.data.updated}</p>
        </div>
        <div>
          <p className={styles.document}>{props.data.document}</p>
        </div>
      </div>
    </Col>
  )
}

export default Card;