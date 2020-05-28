import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const NavBar = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgb(8, 119, 204);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 1, 2);
  margin-bottom: 50px;
`;
const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  text-align: center;
  list-style: none;
  margin-right: 40px;
  font-size: 1em;
  border-bottom: 5px solid
    ${(props) => (props.current ? 'black' : 'transparent')};
  transition: border-bottom 0.3s ease-in-out;
`;
const SLink = styled(Link)`
  color: white;
  text-decoration: none;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
`;

const Header = (props) => {
  return (
    <NavBar>
      {props.isLogin ? (
        <List>
          <Item current={props.location.pathname === '/'}>
            <SLink to="/">HOME</SLink>
          </Item>
          <Item current={props.location.pathname === '/login'}>
            <SLink
              to="/"
              onClick={() => {
                axios
                  .post(`${process.env.REACT_APP_EC2_HOST}/signout`)
                  .then((res) => {
                    if (res.status === 200) {
                      this.props.history.push('/');
                    }
                  })
                  .catch((res) => {
                    alert('사용자가 존재하지 않습니다!');
                  });
                props.loginHandler();
              }}
            >
              LOGOUT
            </SLink>
            {/* 로그인시 state 를변경시켜서  로그인회원가입을 숨긴다.*/}
          </Item>
          <Item current={props.location.pathname === '/signup'}>
            <SLink to="/signup">FAVORITES</SLink>
          </Item>
        </List>
      ) : (
        <List>
          {console.dir(props)}
          <Item current={props.location.pathname === '/'}>
            <SLink to="/">HOME</SLink>
          </Item>
          <Item current={props.location.pathname === '/login'}>
            <SLink to="/login">LOGIN</SLink>
            {/* 로그인시 state 를변경시켜서  로그인회원가입을 숨긴다.*/}
          </Item>
          <Item current={props.location.pathname === '/signup'}>
            <SLink to="/signup">SIGN UP</SLink>
          </Item>
        </List>
      )}
    </NavBar>
  );
};

export default withRouter(Header);
