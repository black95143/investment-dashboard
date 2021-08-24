import React from 'react';
import styles from './Selector.module.css';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

const Selector = (props) => {
  const releaseIdChange = (event) => {
    props.onReleaseIdChange(Number(event.target.value));
  };

  const sourceIdChange = (event) => {
    props.onSourceIdChange(Number(event.target.value));
  };

  return <Row className={styles.selector}>
    <Col sm={12} md={6} lg={4} className={styles.selectorItem}>
      <Form.Select
        aria-label="Default select example"
        defaultValue={props.selectedSourceId}
        onChange={sourceIdChange}
      >
        <option value={0}>All Sources</option>
        {props.sources.map((e) => (
          <option value={e.id} key={e.id}>{e.name}</option>
        ))}
      </Form.Select>
    </Col>
    <Col sm={12} md={6} lg={4} className={styles.selectorItem}>
      <Form.Select
        aria-label="Default select example"
        defaultValue={props.selectedReleaseId}
        onChange={releaseIdChange}
      >
        <option value={0}>All Releases</option>
        {props.releases.map((e) => (
          <option value={e.id} key={e.id}>{e.name}</option>
        ))}
      </Form.Select>
    </Col>
  </Row>
};

export default Selector;