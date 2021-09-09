import React from 'react';
import styles from './Navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import svgIcon from './navbaricon.svg';
import Nav from 'react-bootstrap/Nav';

const Topbar = (props) => {
  return (
    <Navbar className={styles.navbar}>
      <Navbar.Brand className={styles.title} href="/">
        <img
          alt=""
          src={svgIcon}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}Invsetment Dashboard
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" activeKey={props.path}>
          <Nav.Link href="/" className={styles.link}><p>首頁</p></Nav.Link>
          <Nav.Link href="/macroeconomics" className={styles.link}><p>總體經濟</p></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;