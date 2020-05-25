import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import axios from 'axios';
import styled from 'styled-components';
const { kakao } = window;
const KakaoMap = () => {
  useEffect(() => {
    const container = document.getElementById('lets-map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 1,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <div id="lets-map" style={{ width: '80vw', height: '80vw' }}>
        {'map '}
        <BackButton />
      </div>
    </div>
  );
};

export default KakaoMap;
