import React from 'react';

const Footer = () => {
  return (
    <Header>
      {console.log(props)}
      <List>
        <Item current={props.location.pathname === '/login'}>
          <SLink to="/login">LOGIN</SLink>
          {/* 로그인시 state 를변경시켜서  로그인회원가입을 숨긴다.*/}
        </Item>
        <Item current={props.location.pathname === '/signup'}>
          <SLink to="/signup">SIGN UP</SLink>
        </Item>
      </List>
    </Header>
  );
};

export default Footer;
