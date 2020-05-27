/*global kakao*/
import axios from 'axios';

export default function (location, marketList) {
  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=d6aa8c92702a61cd95a4b7b7d7472aa3&autoload=false&libraries=services,clusterer,drawing';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      let container = document.getElementById('mapContainer');
      let options;
      if (location.x !== 0) {
        options = {
          center: new kakao.maps.LatLng(location.y, location.x),
          level: 3,
        };
      } else {
        options = {
          center: new kakao.maps.LatLng(37.275095, 127.009444),
          level: 3,
        };
      }

      //지도를 생성합니다
      const map = new window.kakao.maps.Map(container, options);

      function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
      }

      if (marketList.length === 0 && location.click === true) {
        console.log('내 위치 진입');
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        function searchAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        function displayCenterInfo(result, status) {
          axios
            .get(
              `http://localhost:4000/?address=${result[0].address.region_3depth_name}`,
            )
            .then((res) => {
              console.log('경기도 API에서 받아온 데이터 :', res.data);
              if (res.data.addressList.length === 0) {
                console.log('해당 지역에 없는 업종 진입');
                alert(
                  '해당 주소는 경기도 지역화폐 사용 가능하지 않거나 잘못된 형식의 주소입니다.',
                );
              } else {
                console.log(res.data);

                // 마커를 만들어줍니다
                var bounds = new kakao.maps.LatLngBounds();

                res.data.addressList.forEach((data) => {
                  displayMarker(data);
                  bounds.extend(new kakao.maps.LatLng(data.y, data.x));
                });

                // 이동할 위도 경도 위치를 생성합니다
                var moveLatLon = new kakao.maps.LatLng(
                  res.data.addressList[0].y,
                  res.data.addressList[0].x,
                );

                // 지도 중심을 이동 시킵니다
                map.setCenter(moveLatLon);
              }
            });
        }
      } else if (marketList.length > 0) {
        console.log('업종별 진입');
        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          marker.setMap(map);

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
        // 마커를 만들어줍니다
        var bounds = new kakao.maps.LatLngBounds();

        marketList.forEach((data) => {
          displayMarker(data);
          bounds.extend(new kakao.maps.LatLng(data.y, data.x));
        });

        // 이동할 위도 경도 위치를 생성합니다
        var moveLatLon = new kakao.maps.LatLng(
          marketList[0].y,
          marketList[0].x,
        );

        // 지도 중심을 이동 시킵니다
        map.setCenter(moveLatLon);
      }
    });
  };
}
