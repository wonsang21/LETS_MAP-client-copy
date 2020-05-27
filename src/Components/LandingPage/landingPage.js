import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { geolocated } from 'react-geolocated';
import Indutype from './Indutype';

// import Header from './Header';
// const Header = styled.header`
//   color: white;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 80px;
//   display: flex;
//   align-items: center;
//   padding: 0px 10px;
//   background-color: rgba(20, 20, 20, 1);
//   z-index: 10;
//   box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
// `;

// const List = styled.ul`
//   display: flex;
// `;

// const Item = styled.li`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100px;
//   text-align: center;
//   list-style: none;
//   margin-right: 40px;
//   font-size: 1em;
//   border-bottom: 5px solid
//     ${(props) => (props.current ? '#3498db' : 'transparent')};
//   transition: border-bottom 0.3s ease-in-out;
// `;
// const SLink = styled(Link)`
//   color: dodgerblue;
//   text-decoration: none;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   text-align: center;
// `;

const Body = styled.body`
  padding-top: 200px;
  text-align: center;
  font-size: 7em;
  color: dodgerblue;
`;

const Search = styled.div`
  margin-top: 130px;
  text-align: center;
  height: 100px;
`;
const Spiner = styled.div`
  padding-top: 150px;
  text-align: center;
  margin: auto;
  width: 300px;
  font-size: 300px;
  animation: spin 2s linear infinite;
  color: dodgerblue;
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LandingPage = (props) => {
  const [indutype, setIndutype] = useState('');
  const [inputText, setInputText] = useState('');
  const indutypeHandler = (indu) => {
    setIndutype(indu);
  };

  const onChangeHandler = (e) => {
    setInputText(e.target.value);
  };
  if (props.isloading) {
    return (
      <div>
        <Spiner>
          <i class="fas fa-spinner"></i>
        </Spiner>
      </div>
    );
  } else {
    return (
      <div>
        <Body>
          <Link to="/" style={{ color: 'dodgerblue' }}>
            LET`S_MAP
          </Link>
        </Body>
        <Search>
          <input
            type="Search"
            inverted={true}
            style={{ width: 550, height: 50 }}
            onChange={onChangeHandler}
          />
          <input
            type="submit"
            value="찾기"
            style={{ width: 130, height: 50 }}
            onClick={() => {
              props.getMarketList(inputText, indutype, () => {
                props.positionHandler(
                  props.coords.longitude,
                  props.coords.latitude,
                );
                props.history.push('/map');
              });
              // <Link to="/map"></Link>;
            }}
          />
        </Search>
        <Indutype indutypeHandler={indutypeHandler} />
        <Link
          style={{
            color: 'dodgerblue',
          }}
          to="/map"
          onClick={() => {
            props.positionHandler(
              props.coords.longitude,
              props.coords.latitude,
            );
          }}
        >
          내 위치
        </Link>
        {/* <Footer /> */}
      </div>
    );
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withRouter(LandingPage));
