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
        ////////////////////////////////////////좌표 값 주소 변환 코드///////////////////////////////////////////////////
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, 'dragend', function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        function displayCenterInfo(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            console.log(result);

            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places();

            // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
            var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

            // 키워드로 장소를 검색합니다
            ps.keywordSearch(null, placesSearchCB);

            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB(data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                console.log('키워드를 통해 검색할 때 나오는 주소 :', data[0]);

                let apiSearchWord = data[0].address_name;
                if (apiSearchWord.indexOf('경기도') === -1) {
                  apiSearchWord =
                    data[0].address_name.slice(0, 2) +
                    '도' +
                    data[0].address_name.slice(2);
                }
                console.log(apiSearchWord);
                axios
                  .get(`http://localhost:4000/?address=${apiSearchWord}`)
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.addressList.length === 0) {
                      alert(
                        '해당 주소는 경기도 지역화폐 사용 가능하지 않거나 명확하지 않은 주소입니다. 해당 주소와 가까운 사용 가능 상점으로 연결합니다.',
                      );
                      let areaIndex;
                      if (apiSearchWord.indexOf('동 ') !== -1) {
                        areaIndex = apiSearchWord.indexOf('동 ');
                      } else if (apiSearchWord.indexOf('읍 ') !== -1) {
                        areaIndex = apiSearchWord.indexOf('읍 ');
                      } else {
                        areaIndex = apiSearchWord.indexOf('면 ');
                      }
                      console.log(areaIndex);
                      let addressRefactored = apiSearchWord.substring(
                        0,
                        areaIndex + 1,
                      );
                      console.log(addressRefactored);
                      axios
                        .get(
                          `http://localhost:4000/?address=${addressRefactored}`,
                        )
                        .then((res) => {
                          if (res.data.addressList.length === 0) {
                            alert(
                              '잘못된 주소 형식입니다. 올바른 형식으로 기입해주세요.',
                            );
                          } else {
                            // 가장 주소와 가까운 100개의 상점 구하는 알고리즘 입니다
                            let center = Number(data[0].x) + Number(data[0].y);
                            let markerTemp = [['center', center]];
                            let addressList = res.data.addressList;

                            console.log(data[0]);

                            for (let i = 0; i < addressList.length; i++) {
                              markerTemp.push([
                                i,
                                Number(addressList[i].x) +
                                  Number(addressList[i].y),
                              ]);
                            }
                            console.log(markerTemp);

                            let markerArr = markerTemp.sort((a, b) => {
                              return b[1] - a[1];
                            });

                            let centerIndex = markerArr.indexOf([
                              'center',
                              center,
                            ]);
                            let filteredMarkerArr;
                            if (centerIndex < 500) {
                              filteredMarkerArr = markerArr.slice(0, 1001);
                            } else {
                              filteredMarkerArr = markerArr.slice(
                                centerIndex - 500,
                                centerIndex + 501,
                              );
                            }
                            console.log(filteredMarkerArr);

                            // 마커를 만들어줍니다
                            var bounds = new kakao.maps.LatLngBounds();

                            console.log(addressList[filteredMarkerArr[1][0]]);

                            for (let i = 0; i < filteredMarkerArr.length; i++) {
                              if (filteredMarkerArr[i][0] !== 'center') {
                                displayMarker(
                                  addressList[filteredMarkerArr[i][0]],
                                );
                                bounds.extend(
                                  new kakao.maps.LatLng(
                                    addressList[filteredMarkerArr[i][0]].y,
                                    addressList[filteredMarkerArr[i][0]].x,
                                  ),
                                );
                              }
                            }

                            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                            map.setBounds(bounds);
                          }
                        });
                    } else {
                      // 가장 주소와 가까운 100개의 상점 구하는 알고리즘 입니다
                      let center = Number(data[0].x) + Number(data[0].y);
                      let markerTemp = [['center', center]];
                      let addressList = res.data.addressList;

                      console.log(data[0]);

                      for (let i = 0; i < addressList.length; i++) {
                        markerTemp.push([
                          i,
                          Number(addressList[i].x) + Number(addressList[i].y),
                        ]);
                      }
                      console.log(markerTemp);

                      let markerArr = markerTemp.sort((a, b) => {
                        return b[1] - a[1];
                      });

                      let centerIndex = markerArr.indexOf(['center', center]);
                      let filteredMarkerArr;
                      if (centerIndex < 50) {
                        filteredMarkerArr = markerArr.slice(0, 101);
                      } else {
                        filteredMarkerArr = markerArr.slice(
                          centerIndex - 50,
                          centerIndex + 51,
                        );
                      }
                      console.log(filteredMarkerArr);

                      // 마커를 만들어줍니다
                      var bounds = new kakao.maps.LatLngBounds();

                      console.log(addressList[filteredMarkerArr[1][0]]);

                      for (let i = 0; i < filteredMarkerArr.length; i++) {
                        if (filteredMarkerArr[i][0] !== 'center') {
                          displayMarker(addressList[filteredMarkerArr[i][0]]);
                          bounds.extend(
                            new kakao.maps.LatLng(
                              addressList[filteredMarkerArr[i][0]].y,
                              addressList[filteredMarkerArr[i][0]].x,
                            ),
                          );
                        }
                      }

                      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                      map.setBounds(bounds);
                    }
                  });
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
          }
        }
        ////////////////////////////////////////화면 이동시 이벤트 발생 코드//////////////////////////////////////////////
        kakao.maps.event.addListener(map, 'dragend', function () {
          // 지도 중심좌표를 얻어옵니다
          var latlng = map.getCenter();

          var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';
          console.log(message);
        });
      });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPlace !== prevState.currentPlace) {
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
            level: 2,
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
              console.log('키워드를 통해 검색할 때 나오는 주소 :', data[0]);

              let apiSearchWord = data[0].address_name;
              if (apiSearchWord.indexOf('경기도') === -1) {
                apiSearchWord =
                  data[0].address_name.slice(0, 2) +
                  '도' +
                  data[0].address_name.slice(2);
              }
              console.log(apiSearchWord);
              axios
                .get(`http://localhost:4000/?address=${apiSearchWord}`)
                .then((res) => {
                  console.log(res.data);
                  if (res.data.addressList.length === 0) {
                    alert(
                      '해당 주소는 경기도 지역화폐 사용 가능하지 않거나 명확하지 않은 주소입니다. 해당 주소와 가까운 사용 가능 상점으로 연결합니다.',
                    );
                    let areaIndex;
                    if (apiSearchWord.indexOf('동 ') !== -1) {
                      areaIndex = apiSearchWord.indexOf('동 ');
                    } else if (apiSearchWord.indexOf('읍 ') !== -1) {
                      areaIndex = apiSearchWord.indexOf('읍 ');
                    } else {
                      areaIndex = apiSearchWord.indexOf('면 ');
                    }
                    console.log(areaIndex);
                    let addressRefactored = apiSearchWord.substring(
                      0,
                      areaIndex + 1,
                    );
                    console.log(addressRefactored);
                    axios
                      .get(
                        `http://localhost:4000/?address=${addressRefactored}`,
                      )
                      .then((res) => {
                        if (res.data.addressList.length === 0) {
                          alert(
                            '잘못된 주소 형식입니다. 올바른 형식으로 기입해주세요.',
                          );
                        } else {
                          // 가장 주소와 가까운 100개의 상점 구하는 알고리즘 입니다
                          let center = Number(data[0].x) + Number(data[0].y);
                          let markerTemp = [['center', center]];
                          let addressList = res.data.addressList;

                          console.log(data[0]);

                          for (let i = 0; i < addressList.length; i++) {
                            markerTemp.push([
                              i,
                              Number(addressList[i].x) +
                                Number(addressList[i].y),
                            ]);
                          }
                          console.log(markerTemp);

                          let markerArr = markerTemp.sort((a, b) => {
                            return b[1] - a[1];
                          });

                          let centerIndex = markerArr.indexOf([
                            'center',
                            center,
                          ]);
                          let filteredMarkerArr;
                          if (centerIndex < 500) {
                            filteredMarkerArr = markerArr.slice(0, 1001);
                          } else {
                            filteredMarkerArr = markerArr.slice(
                              centerIndex - 500,
                              centerIndex + 501,
                            );
                          }
                          console.log(filteredMarkerArr);

                          // 마커를 만들어줍니다
                          var bounds = new kakao.maps.LatLngBounds();

                          console.log(addressList[filteredMarkerArr[1][0]]);

                          for (let i = 0; i < filteredMarkerArr.length; i++) {
                            if (filteredMarkerArr[i][0] !== 'center') {
                              displayMarker(
                                addressList[filteredMarkerArr[i][0]],
                              );
                              bounds.extend(
                                new kakao.maps.LatLng(
                                  addressList[filteredMarkerArr[i][0]].y,
                                  addressList[filteredMarkerArr[i][0]].x,
                                ),
                              );
                            }
                          }

                          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                          map.setBounds(bounds);
                        }
                      });
                  } else {
                    // 가장 주소와 가까운 100개의 상점 구하는 알고리즘 입니다
                    let center = Number(data[0].x) + Number(data[0].y);
                    let markerTemp = [['center', center]];
                    let addressList = res.data.addressList;

                    console.log(data[0]);

                    for (let i = 0; i < addressList.length; i++) {
                      markerTemp.push([
                        i,
                        Number(addressList[i].x) + Number(addressList[i].y),
                      ]);
                    }
                    console.log(markerTemp);

                    let markerArr = markerTemp.sort((a, b) => {
                      return b[1] - a[1];
                    });

                    let centerIndex = markerArr.indexOf(['center', center]);
                    let filteredMarkerArr;
                    if (centerIndex < 50) {
                      filteredMarkerArr = markerArr.slice(0, 101);
                    } else {
                      filteredMarkerArr = markerArr.slice(
                        centerIndex - 50,
                        centerIndex + 51,
                      );
                    }
                    console.log(filteredMarkerArr);

                    // 마커를 만들어줍니다
                    var bounds = new kakao.maps.LatLngBounds();

                    console.log(addressList[filteredMarkerArr[1][0]]);

                    for (let i = 0; i < 100; i++) {
                      displayMarker(res.data.addressList[i]);
                      bounds.extend(
                        new kakao.maps.LatLng(
                          res.data.addressList[i].y,
                          res.data.addressList[i].x,
                        ),
                      );
                    }

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                    map.setBounds(bounds);
                  }
                });
            } else {
              alert('잘못된 주소 형식입니다.');
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
    }
  }

  render() {
    return (
      <div>
        <Mapping id="mapContainer"></Mapping>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let data = this.state;
              this.handleSearchValue();
            }}
          >
            <Link
              style={{
                color: 'dodgerblue',
              }}
              to="/"
            >
              HOME
            </Link>
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
            />
          </form>
        </div>
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
