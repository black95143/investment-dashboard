import React from 'react';
import styles from './Navbar.module.css';
import Navbar from 'react-bootstrap/Navbar';
import svgIcon from './navbaricon.svg';


const Nav = () => {
  return (
    <Navbar className={styles.navbar}>
      <Navbar.Brand className={styles.title}>
        <img
          alt=""
          src={svgIcon}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}Invsetment Dashboard
      </Navbar.Brand>
    </Navbar>
  );
};

export default Nav;