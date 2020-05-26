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
      currentPlace: '',
      searchPlace: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleSearchValue = () => {
    this.setState({ currentPlace: this.state.searchPlace });
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
          center: new kakao.maps.LatLng(
            this.props.position.y,
            this.props.position.x,
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPlace !== prevState.currentPlace) {
      axios
        .get(`http://localhost:4000/?address=${this.state.currentPlace}`)
        .then((res) => {
          console.log(res.data);

          const script = document.createElement('script');
          script.async = true;
          script.src =
            'https://dapi.kakao.com/v2/maps/sdk.js?appkey=d6aa8c92702a61cd95a4b7b7d7472aa3&autoload=false&libraries=services,clusterer,drawing';
          document.head.appendChild(script);

          script.onload = () => {
            kakao.maps.load(() => {
              let container = document.getElementById('mapContainer');
              let options = {
                center: new kakao.maps.LatLng(37.275095, 127.009444),
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);

              // 장소 검색 객체를 생성합니다
              var ps = new kakao.maps.services.Places();

              // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
              var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

              // 키워드로 장소를 검색합니다
              ps.keywordSearch(this.state.currentPlace, placesSearchCB);

              // 키워드 검색 완료 시 호출되는 콜백함수 입니다
              function placesSearchCB(data, status, pagination) {
                if (status === kakao.maps.services.Status.OK) {
                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                  // LatLngBounds 객체에 좌표를 추가합니다
                  console.log(data);
                  var bounds = new kakao.maps.LatLngBounds();

                  for (var i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                  }
                  let addressList = res.data.addressList;
                  for (var i = 0; i < 50; i++) {
                    displayMarker(addressList[i]);
                    bounds.extend(
                      new kakao.maps.LatLng(addressList[i].y, addressList[i].x),
                    );
                  }

                  // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                  map.setBounds(bounds);
                }
              }

              // 지도에 마커를 표시하는 함수입니다
              function displayMarker(place) {
                // 마커를 생성하고 지도에 표시합니다
                var marker = new kakao.maps.Marker({
                  map: map,
                  position: new kakao.maps.LatLng(place.y, place.x),
                });

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function () {
                  // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                  infowindow.setContent(
                    '<div style="padding:5px;font-size:12px;">' +
                      place.place_name +
                      '</div>',
                  );
                  infowindow.open(map, marker);
                });
              }
            });
          };
        });
    }
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let data = this.state;
              this.handleSearchValue();
            }}
          >
            <input
              type="text"
              placeholder="찾고싶은 곳이 있나요?"
              style={{ width: 550, height: 50 }}
              onChange={this.handleInputValue('searchPlace')}
              id="keyword"
            ></input>
            <input
              type="submit"
              value="찾기"
              style={{ width: 130, height: 50 }}
              onClick={console.log(this.state)}
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
  margin: 0 auto;
`;

export default withRouter(Map);
