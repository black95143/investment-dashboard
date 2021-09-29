import React, { useCallback, useEffect, useState } from 'react';
import styles from './USStock.module.css';
import { Row } from 'react-bootstrap';
import IndexCloseInfo from '../../../UI/IndexCloseInfo/IndexCloseInfo';
import FinmindAPIUS from '../../../API/finmindAPI/findmindAPIUS';
const dataset = "USStockPrice";
const today = new Date();

const fetchCloseData = async () => {
  let parse_date = new Date(today.valueOf() - 4 * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
  const [DJI, GSPC, IXIC, SOX, VIX] = await Promise.all([
    FinmindAPIUS({ dataset, data_id: "^DJI", start_date: parse_date, end_date: "" }),
    FinmindAPIUS({ dataset, data_id: "^GSPC", start_date: parse_date, end_date: "" }),
    FinmindAPIUS({ dataset, data_id: "^IXIC", start_date: parse_date, end_date: "" }),
    FinmindAPIUS({ dataset, data_id: "^SOX", start_date: parse_date, end_date: "" }),
    FinmindAPIUS({ dataset, data_id: "^VIX", start_date: parse_date, end_date: "" }),
  ])

  return [
    {
      info: { iconText: "道", name: "道瓊指數" },
      close: { date: DJI[DJI.length - 1].date, price: DJI[DJI.length - 1].Close, spread: Math.round((DJI[DJI.length - 1].Close - DJI[DJI.length - 2].Close) * 100) / 100 }
    },
    {
      info: { iconText: "標", name: "標普500指數" },
      close: { date: GSPC[GSPC.length - 1].date, price: GSPC[GSPC.length - 1].Close, spread: Math.round((GSPC[GSPC.length - 1].Close - GSPC[GSPC.length - 2].Close) * 100) / 100 }
    },
    {
      info: { iconText: "那", name: "那斯達克指數" },
      close: { date: IXIC[IXIC.length - 1].date, price: IXIC[IXIC.length - 1].Close, spread: Math.round((IXIC[IXIC.length - 1].Close - IXIC[IXIC.length - 2].Close) * 100) / 100 }
    },
    {
      info: { iconText: "費", name: "費城半導體指數" },
      close: { date: SOX[SOX.length - 1].date, price: SOX[SOX.length - 1].Close, spread: Math.round((SOX[SOX.length - 1].Close - SOX[SOX.length - 2].Close) * 100) / 100 }
    },
    {
      info: { iconText: "恐", name: "恐慌指數" },
      close: { date: VIX[VIX.length - 1].date, price: VIX[VIX.length - 1].Close, spread: Math.round((VIX[VIX.length - 1].Close - VIX[VIX.length - 2].Close) * 100) / 100 }
    }
  ]
};

const USStock = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const closeData = await Promise.all([
        fetchCloseData()
      ])

      setData({
        ...closeData
      })
      setIsLoading(false);
    }
    fetchingData();
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <React.Fragment>
      <div className={styles.frame}>
        <div className={styles.left_side}>
          <div className={styles.icon}>US</div>
        </div>
        <div className={styles.right_side}>
          <p className={styles.title}>美國股市</p>
          {isLoading && <p className={styles.loading}>Loading...</p>}
          {!isLoading &&
            <Row className={styles.bar_group}>
              {data[0].map((e) => (
                <IndexCloseInfo data={e} key={Math.random()} />
              ))}
            </Row>
          }
        </div>
      </div>
    </React.Fragment>
  )
};

export default USStock;