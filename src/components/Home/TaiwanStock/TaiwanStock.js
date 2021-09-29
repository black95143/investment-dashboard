import React, { useCallback, useEffect, useState } from 'react';
import styles from './TaiwanStock.module.css';
import { Row } from 'react-bootstrap';
import IndexCloseInfo from '../../../UI/IndexCloseInfo/IndexCloseInfo';
import FinmindAPI from '../../../API/finmindAPI/finmindAPI';

const today = new Date();

const fetchCloseData = () => {
  let parse_date = new Date(today.valueOf() - 15 * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
  return FinmindAPI({
    dataset: "TaiwanStockPrice",
    data_id: "TAIEX",
    start_date: parse_date,
    end_date: ""
  }).then((response) => response.json())
    .then((res) => {
      return {
        dailyClose: {
          info: { iconText: "加", name: "台股加權指數" },
          close: { date: res.data[res.data.length - 1].date, price: res.data[res.data.length - 1].close, spread: res.data[res.data.length - 1].spread }
        }
      }
    })
};

const fetchInstitutionBuySell = () => {
  let parse_date = new Date(today.valueOf() - 15 * 1000 * 60 * 60 * 24).toISOString().slice(0, 10);
  return FinmindAPI({
    dataset: "TaiwanStockPrice",
    data_id: "TAIEX",
    start_date: parse_date,
    end_date: ""
  }).then((response) => response.json())
    .then((res) => {
      return FinmindAPI({
        dataset: "TaiwanStockTotalInstitutionalInvestors",
        data_id: "",
        start_date: res.data[res.data.length - 1].date,
        end_date: ""
      }).then((response) => response.json())
        .then((res) => {
          if (res.data.length === 0) {
          } else {
            return {
              buySell: {
                foreignInvestor: {
                  info: { iconText: "外", name: "外資買賣超" },
                  close: { date: res.data[3].date, price: res.data[3].buy - res.data[3].sell, spread: "" }
                },
                investmentTrust: {
                  info: { iconText: "投", name: "投信買賣超" },
                  close: { date: res.data[2].date, price: res.data[2].buy - res.data[2].sell, spread: "" }
                },
                dealerSelf: {
                  info: { iconText: "自", name: "自營買賣超(合計)" },
                  close: { date: res.data[0].date, price: res.data[0].buy + res.data[1].buy - res.data[0].sell - res.data[1].sell, spread: "" }
                }
              }
            }
          }
        })
    })
};

const TaiwanStock = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [closeData, institutionBuySell] = await Promise.all([
        fetchCloseData(),
        fetchInstitutionBuySell()
      ])

      setData({
        ...closeData,
        ...institutionBuySell
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
          <div className={styles.icon}>TW</div>
        </div>
        <div className={styles.right_side}>
          <p className={styles.title}>台灣股市</p>
          {isLoading && <p className={styles.loading}>Loading...</p>}
          {!isLoading && <Row className={styles.bar_group}>
            <IndexCloseInfo data={data.dailyClose} />
            <IndexCloseInfo data={data.buySell.foreignInvestor} />
            <IndexCloseInfo data={data.buySell.investmentTrust} />
            <IndexCloseInfo data={data.buySell.dealerSelf} />
          </Row>}
        </div>
      </div>
    </React.Fragment>
  )
};

export default TaiwanStock;