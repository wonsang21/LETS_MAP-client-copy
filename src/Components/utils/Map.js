/*global kakao*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import oc from 'open-color';
require('dotenv').config();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPlace: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  componentDidMount() {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=d6aa8c92702a61cd95a4b7b7d7472aa3&autoload=false&libraries=services,clusterer,drawing';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById('mapContainer');
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let data = this.state;
              console.log(data);
            }}
          >
            <input
              type="searchPlace"
              placeholder="찾고싶은 곳이 있나요?"
              style={{ width: 550, height: 50 }}
              onChange={this.handleInputValue('searchPlace')}
            ></input>
            <input
              type="submit"
              value="찾기"
              style={{ width: 130, height: 50 }}
            />
          </form>
        </div>
        <Mapping id="mapContainer"></Mapping>
      </div>
    );
  }
}

const Mapping = styled.div`
  width: 1800px;
  height: 900px;
`;
const Button = styled.button`
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  background: rgba(20, 20, 20, 1);
  color: white;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  &:hover {
    background: ${oc.teal[5]};
  }
  &:active {
    background: ${oc.teal[7]};
  }
`;

export default withRouter(Map);
