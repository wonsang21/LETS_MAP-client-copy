/*global kakao*/
import axios from 'axios';

export default function (searchedPlace) {
  const script = document.createElement('script');
  script.async = true;
  script.src =
    'http://dapi.kakao.com/v2/maps/sdk.js?appkey=d6aa8c92702a61cd95a4b7b7d7472aa3&autoload=false&libraries=services,clusterer,drawing';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      let container = document.getElementById('mapContainer');
      let options = {
        center: new kakao.maps.LatLng(37.275095, 127.009444),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);
      console.log(searchedPlace);

      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(searchedPlace.currentPlace, placesSearchCB);

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

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          console.log('카카오로 검색할 때 나오는 주소 :', data[0]);

          let apiSearchWord = data[0].address_name;
          if (apiSearchWord.indexOf('경기도') === -1) {
            apiSearchWord =
              data[0].address_name.slice(0, 2) +
              '도' +
              data[0].address_name.slice(2) +
              ' ';
          }
          console.log(apiSearchWord);
          let areaIndex;
          if (apiSearchWord.indexOf('동 ') !== -1) {
            areaIndex = apiSearchWord.indexOf('동 ');
          } else if (apiSearchWord.indexOf('읍 ') !== -1) {
            areaIndex = apiSearchWord.indexOf('읍 ');
          } else {
            areaIndex = apiSearchWord.indexOf('면 ');
          }
          console.log('잘라내야 할 인덱스 값 : ' + areaIndex);
          let addressRefactored = apiSearchWord.substring(0, areaIndex + 1);
          console.log('읍면동으로만 잘라서 검색할 때 : ' + addressRefactored);

          axios
            .get(`http://localhost:4000/?address=${addressRefactored}`)
            .then((res) => {
              console.log('경기도 API에서 받아온 데이터 :', res.data);
              if (res.data.addressList.length === 0) {
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
        } else {
          alert('잘못된 주소 형식입니다.');
        }
      }
    });
  };
}
