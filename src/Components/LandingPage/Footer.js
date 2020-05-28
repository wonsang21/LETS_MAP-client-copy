import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Foot = styled.div`
  margin-top: 0px;
  /* background-color: rgb(8, 119, 204); */
  height: 10vw;
  border-radius: 5px;
  width: 100%;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('https://static-s.aa-cdn.net/img/gp/20600003041621/GEF40VtYYC8vNKcKzDvB1XLhvrgBKcAfw00mlnmkUy88N5xqSE1tU-YKCZyDS5yyvQ=s300');
`;

const Footer = () => {
  return (
    <Link style={{ color: 'rgb(8, 119, 204)' }} to="/map" onClick={() => {}}>
      <Foot>
        <div> </div>
      </Foot>
    </Link>
  );
};

export default Footer;
