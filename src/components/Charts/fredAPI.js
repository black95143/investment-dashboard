const useFredAPI = (series_id) => {
  return fetch(`${process.env.REACT_APP_PROXY_SERVER_URL}/series/observations?series_id=${series_id}&api_key=${process.env.REACT_APP_API_KEY}&file_type=json`, {
    headers: {
      'Target-URL': 'https://api.stlouisfed.org/fred'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      let seriesData = [];
      data.observations.forEach(ob => {
        seriesData.push([new Date(ob.date).getTime(), Number(ob.value)]);
      });
      return seriesData;
    })
};

export default useFredAPI;