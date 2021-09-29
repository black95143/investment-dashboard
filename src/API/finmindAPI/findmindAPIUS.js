const api = ({ dataset, data_id, start_date, end_date }) => {
  return fetch(`${process.env.REACT_APP_PROXY_SERVER_URL}/data?dataset=${dataset}&data_id=${data_id}&start_date=${start_date}&end_date=${end_date}&token=${process.env.REACT_APP_FINMIND_TOKEN}`, {
    headers: {
      'Target-URL': 'https://api.finmindtrade.com/api/v4'
    }
  }).then((response) => response.json())
    .then((res) => {
      return res.data
    })
}

export default api;