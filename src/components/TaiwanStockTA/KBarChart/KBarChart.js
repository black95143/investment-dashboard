import React, {useCallback, useState, useEffect} from 'react';
import ReactLoading from "react-loading";
import styles from './KBarChart.module.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import FinmindAPI from '../../../API/finmindAPI/finmindAPI';

const today = new Date();

const KBarChart = (props) => {
  const [chartSeries, setChartSeries] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async (stockNo) => {
    let parse_date = new Date(today.valueOf() - 380 * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
    return FinmindAPI({
      dataset: "TaiwanStockPrice",
      data_id: stockNo,
      start_date: parse_date,
      end_date: ""
    }).then((response) => response.json())
      .then((res) => {
        let stockId = res.data[0].stock_id,
            latestTwoClose = [],
            ohlc = [],
            volume = [],
            dataLength = res.data.length,
            // set the allowed units for data grouping
            groupingUnits = [[
              'week',                         // unit name
              [1]                             // allowed multiples
            ], [
              'month',
              [1, 2, 3, 4, 6]
            ]],

            i = 0;

        for (i; i < dataLength; i += 1) {
          ohlc.push([
            new Date(res.data[i].date).getTime(), // the date
            res.data[i].open, // open
            res.data[i].max, // high
            res.data[i].min, // low
            res.data[i].close // close
          ]);

          volume.push([
            new Date(res.data[i].date).getTime(), // the date
            res.data[i].Trading_Volume // the volume
          ]);

          if (i === dataLength - 2) {
            latestTwoClose.push(res.data[i].close)
          }
          if (i === dataLength - 1) {
            latestTwoClose.push(res.data[i].close)
          }
        }

        setChartSeries(() => {
          return {
            stockId,
            series: [{
              type: 'candlestick',
              name: props.stockNo,
              data: ohlc,
              dataGrouping: {
                units: groupingUnits
              }
            }, {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1,
              dataGrouping: {
                units: groupingUnits
              }
            }],
            spread_value: Math.round((latestTwoClose[1] - latestTwoClose[0]) * 100) / 100,
            spread_percent: Math.round((latestTwoClose[1] - latestTwoClose[0]) / latestTwoClose[0] * 10000) / 100
          }
        })

        setIsLoading(false);
      })
  }, [props.stockNo]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(props.stockNo);
  }, [fetchData, props]);

  return (
    <React.Fragment>
      {isLoading && <ReactLoading className={styles.loading_icon} type={'spin'} color={'#89CCDF'} width={100} />}
      {!isLoading && 
        <div className={styles.frame}>
        <div className={styles.stock_name}>{chartSeries.stockId}</div>
        <div className={styles.lastClose}>
          <div className={styles.price}>{chartSeries.series[0].data[chartSeries.series[0].data.length-1][4]}</div>
          {chartSeries.spread_value > 0 &&  <div className={`${styles.spread_value} ${styles.red_text}`}>+{chartSeries.spread_value}</div>}
          {chartSeries.spread_value < 0 &&  <div className={`${styles.spread_value} ${styles.green_text}`}>{chartSeries.spread_value}</div>}
          {chartSeries.spread_value > 0 && <div className={`${styles.spread_percent} ${styles.red_text}`}>(+{chartSeries.spread_percent}%)</div>}
          {chartSeries.spread_value < 0 && <div className={`${styles.spread_percent} ${styles.green_text}`}>({chartSeries.spread_percent}%)</div>}
        </div>
        <div className={styles.bar_chart}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={{
              rangeSelector: {
                selected: 5
              },
          
              chart: {
                height: 500
              },
          
              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                  enabled: true
                }
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
              }],
          
              tooltip: {
                split: true
              }
              ,...chartSeries
            }}
          />
        </div>
      </div>
      }
    </React.Fragment>
  )
};

export default KBarChart;