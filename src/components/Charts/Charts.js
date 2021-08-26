import React from 'react';
import Card from './Card';
import Pagination from '../../UI/pagination';

const Charts = (props) => {
  return (
    <Pagination
      data={props.charts}
      RenderComponent={Card}
      pageLimit={Math.ceil(props.charts.length / 3)}
      dataLimit={3}
    />
  )
};

export default Charts;