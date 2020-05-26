import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.ul`
  display: block;
  font-size: 0;
  border-left: 1px solid #ddd;
  border: none;
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

const Text = styled.span`
  margin: auto;
`;
const Indutype = () => {
  const click = (e) => {
    console.log(e.target.value);
  };

  return (
    <div class="biz_area_list">
      <Container onClick={click}>
        <IndutypeList value="lodgment" class="" data-biz-type="1001">
          <Text>숙박</Text>
        </IndutypeList>
        <IndutypeList value="General_rest_food" data-biz-type="1101">
          <Text>여행</Text>
        </IndutypeList>
        <IndutypeList value="leisure" data-biz-type="2001">
          <Text>레저</Text>
        </IndutypeList>
        <IndutypeList value="Culture_hobby" data-biz-type="2201">
          <Text>문화/취미</Text>
        </IndutypeList>
        <IndutypeList
          value="Clothing_goods_household_appliances"
          data-biz-type="4201"
        >
          <Text>의류/잡화/생활가전</Text>
        </IndutypeList>
        <IndutypeList value="gasstation" data-biz-type="3301">
          <Text>주유소</Text>
        </IndutypeList>
        <IndutypeList value="circulation" data-biz-type="4001">
          <Text>유통</Text>
        </IndutypeList>
        <IndutypeList value="Books_stationery" data-biz-type="5001">
          <Text>서적/문구</Text>
        </IndutypeList>
        <IndutypeList value="Academy" data-biz-type="5101">
          <Text>학원</Text>
        </IndutypeList>
        <IndutypeList value="Office_communications" data-biz-type="5201">
          <Text>사무통신</Text>
        </IndutypeList>
        <IndutypeList value="Carsales" data-biz-type="6001">
          <Text>자동차판매</Text>
        </IndutypeList>
        <IndutypeList value="service" data-biz-type="6101">
          <Text>서비스</Text>
        </IndutypeList>
        <IndutypeList value="hospital" data-biz-type="7001">
          <Text>병원</Text>
        </IndutypeList>
        <IndutypeList value="pharmacy" data-biz-type="7040">
          <Text>약국</Text>
        </IndutypeList>
        <IndutypeList value="General_rest_food" data-biz-type="8001">
          <Text>일반/휴게음식</Text>
        </IndutypeList>
        <IndutypeList value="Confectionery_beverage" data-biz-type="8301">
          <Text>제과/음료식품</Text>
        </IndutypeList>
        <IndutypeList value="Other" data-biz-type="9993">
          <Text>기타</Text>
        </IndutypeList>
      </Container>
    </div>
  );
};

export default Indutype;
