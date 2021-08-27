import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import styles from './Pagination.module.css';

const Pagination = (props) => {
  const { data, RenderComponent, pageLimit, dataLimit } = props;
  const pages = Math.ceil(data.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  }

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      <div className="dataContainer">
        <Row>
          {getPaginatedData().map((d, idx) => (
            <RenderComponent key={idx} data={d} />
          ))}
        </Row>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={goToPreviousPage}
          className={`${styles.prev} ${currentPage === 1 ? styles.disabled : ''}`}
        >
          prev
        </button>
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`${styles.next} ${currentPage === pages || pages === 0 ? styles.disabled : ''}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;