import React, { useRef } from 'react';
import Card from './Card';
import Pagination from '../../UI/Pagination';

const Charts = (props) => {
  const cachedData = useRef({});
  const saveCachedDataHandler = (seriesId, seriesData, fetchDate) => {
    cachedData.current[seriesId] = {
      "seriesData": seriesData,
      "fetchDate": fetchDate
    }
  }

  return (
    <Pagination
      data={props.charts}
      RenderComponent={Card}
      pageLimit={Math.ceil(props.charts.length / 3)}
      dataLimit={3}
      cachedData={cachedData}
      onSaveCachedData={saveCachedDataHandler}
    />
  )
};

export default Charts;