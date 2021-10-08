import React from 'react';
import styles from './KBarChart.module.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import data from './dummyData.json';

let ohlc = [],
  volume = [],
  dataLength = data.length,
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
    new Date(data[i].date).getTime(), // the date
    data[i].open, // open
    data[i].max, // high
    data[i].min, // low
    data[i].close // close
  ]);

  volume.push([
    new Date(data[i].date).getTime(), // the date
    data[i].Trading_Volume // the volume
  ]);
}

const KBarChart = () => {
  const chartOption = {
    rangeSelector: {
      selected: 1
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
    },

    series: [{
      type: 'candlestick',
      name: '2330',
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
    }]
  }

  return (
    <React.Fragment>
      <div className={styles.frame}>
        <div className={styles.stock_name}>台積電(2330)</div>
        <div className={styles.lastClose}>
          <div className={styles.price}>580</div>
          <div className={styles.spread_value}>+9.00</div>
          <div className={styles.spread_percent}>(+1.58%)</div>
        </div>
        <div className={styles.bar_chart}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={chartOption}
          />
        </div>
      </div>
    </React.Fragment>
  )
};

export default KBarChart;