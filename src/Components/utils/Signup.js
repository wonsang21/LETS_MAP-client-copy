import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import oc from 'open-color';
//css 부분
// 전체 정렬 부분
const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
// 박스 부분
const Box = styled.div`
  width: 500px;
`;
// 로고 감싸는 부분
const LogoWrapper = styled.div`
  background: ${oc.blue[9]};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
// 로고 부분
const Logo = styled(Link)`
  color: white;
  font-family: ;
  font-size: 2.4rem;
  letter-spacing: 5px;
  text-decoration: none;
`;
// 바디 부분
const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;
// 입력 부분
const Input = styled.input`
  width: 100%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
// 회원가입 버튼 부분
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
require('dotenv').config();
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      password: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    return (
      <Positioner>
        <Box>
          <div>
            <center>
              <LogoWrapper>
                <Logo to="/">LETS MAP</Logo>
              </LogoWrapper>
              <Contents>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let data = this.state;
                    axios
                      .post(`${process.env.REACT_APP_EC2_HOST}/signup`, data)
                      .then((res) => {
                        console.log(res.data);
                        this.props.history.push('/');
                      });
                  }}
                >
                  <div>
                    <Input
                      type="userid"
                      placeholder="ID를 입력 해주세요"
                      onChange={this.handleInputValue('userid')}
                    ></Input>
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력 해주세요"
                      onChange={this.handleInputValue('password')}
                    ></Input>
                  </div>
                  <Button type="submit">회원가입</Button>
                  <div style={{ marginTop: '1rem' }}>
                    <Link
                      style={{
                        color: 'dodgerblue',
                      }}
                      to="/login"
                    >
                      아이디가 있으신가요?
                    </Link>
                  </div>
                </form>
              </Contents>
            </center>
          </div>
        </Box>
      </Positioner>
    );
  }
}
export default withRouter(Signup);
