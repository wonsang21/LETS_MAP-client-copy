import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { geolocated } from 'react-geolocated';
import Indutype from './Indutype';

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
              true,
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
