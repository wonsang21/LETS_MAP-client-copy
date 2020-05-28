import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  display: block;
  font-size: 0;
  width: 50%;
  border-left: 1px solid #ddd;
  border: none;
  margin: auto;
  align-items: center;
`;

const IndutypeList = styled.button`
  display: inline-flex;
  width: 187px;
  font-size: 13px;
  color: #000;
  height: 55px;
  line-height: 19px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background: #fff;
  align-items: center;
`;

const Indutype = ({ indutypeHandler }) => {
  const click = (e) => {
    console.log(e.target.value);
    indutypeHandler(e.target.value);
  };

  return (
    <div class="biz_area_list">
      <Container onClick={click}>
        <IndutypeList value="lodgment" class="" data-biz-type="1001">
          숙박
        </IndutypeList>
        <IndutypeList value="General_rest_food" data-biz-type="1101">
          여행
        </IndutypeList>
        <IndutypeList value="leisure" data-biz-type="2001">
          레저
        </IndutypeList>
        <IndutypeList value="Culture_hobby" data-biz-type="2201">
          문화/취미
        </IndutypeList>
        <IndutypeList
          value="Clothing_goods_household_appliances"
          data-biz-type="4201"
        >
          의류/잡화/생활가전
        </IndutypeList>
        <IndutypeList value="gasstation" data-biz-type="3301">
          주유소
        </IndutypeList>
        <IndutypeList value="circulation" data-biz-type="4001">
          유통
        </IndutypeList>
        <IndutypeList value="Books_stationery" data-biz-type="5001">
          서적/문구
        </IndutypeList>
        <IndutypeList value="Academy" data-biz-type="5101">
          학원
        </IndutypeList>
        <IndutypeList value="Office_communications" data-biz-type="5201">
          사무통신
        </IndutypeList>
        <IndutypeList value="Carsales" data-biz-type="6001">
          자동차판매
        </IndutypeList>
        <IndutypeList value="service" data-biz-type="6101">
          서비스
        </IndutypeList>
        <IndutypeList value="hospital" data-biz-type="7001">
          병원
        </IndutypeList>
        <IndutypeList value="pharmacy" data-biz-type="7040">
          약국
        </IndutypeList>
        <IndutypeList value="General_rest_food" data-biz-type="8001">
          일반/휴게음식
        </IndutypeList>
        <IndutypeList value="Confectionery_beverage" data-biz-type="8301">
          제과/음료식품
        </IndutypeList>
        <IndutypeList value="Other" data-biz-type="9993">
          기타
        </IndutypeList>
      </Container>
    </div>
  );
};

export default Indutype;
