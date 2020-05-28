import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import oc from 'open-color';
import queryString from 'query-string';

require('dotenv').config();
//css 부분
// 전체 정렬 부분
const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
// 박스 부분
const Box1 = styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  width: 700px;
  height: auto;
  background: white;
`;

const Box2 = styled.div`
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  width: 700px;
  height: auto;
  background: white;
  padding: 15px;
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

// 리뷰 입력 부분
const TextArea = styled(Textarea)`
  width: 100%;
  width: 100%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  font-weight: 300;
  font-size: 1.1rem;
  margin-top: 1rem;
  resize: none;
`;
// 등록 버튼 부분
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
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  renderReviewText = (text) => {
    let target = document.querySelector('#reviewReading');
    let line = document.createElement('hr');
    line.style = 'width: 100%;';
    let ul = document.createElement('ul');
    target.prepend(ul);
    target.prepend(line);
    let content = document.createElement('div');
    content.className = 'content';
    content.textContent = text.text;
    ul.appendChild(content);
    let userid = document.createElement('div');
    userid.className = 'userid';
    userid.textContent = text.userid;
    ul.appendChild(userid);
  };
  async componentDidMount() {
    let token = localStorage.getItem('userToken');
    //토큰확인
    let config = {
      headers: {
        Authorization: token,
      },
    };
    console.log(localStorage.getItem('userToken'));
    axios
      .post(`http://${process.env.REACT_APP_EC2_HOST}/userinfo`, null, config)
      .then((res) => {
        console.dir(res);
        this.props.loginHandler(res.data.userid);
      });
    // 해당 가게의 리뷰를 서버에서 가져온다.
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    let position = queryString.parse(this.props.location.search);
    if (position) {
      fetch(
        `http://${process.env.REACT_APP_EC2_HOST}/review?logt=${position.logt}&lat=${position.lat}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result['reviews']);
          for (let i = 0; i < result['reviews'].length; i++) {
            this.renderReviewText(result['reviews'][i]);
          }
        })
        .catch((error) => console.log('error', error));
    } else {
      console.log('좌표가 존재하지 않습니다');
    }
  }
  componentDidUpdate() {
    //
  }
  render() {
    console.log(queryString.parse(this.props.location.search));
    return (
      <Positioner>
        <Box1>
          <div>
            <center>
              <LogoWrapper>
                <Logo>리뷰</Logo>
              </LogoWrapper>
              <Contents>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    let data = this.state;
                    let position = queryString.parse(
                      this.props.location.search,
                    );
                    data.userid = this.props.user.userid;
                    data.market = {
                      logt: position.logt,
                      lat: position.lat,
                    };
                    console.log(data);
                    axios
                      .post(
                        `http://${process.env.REACT_APP_EC2_HOST}/review`,
                        data,
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          this.props.history.push(
                            `/review?logt=${position.logt}&lat=${position.lat}`,
                          );
                          alert('리뷰 보내기 성공');
                          window.location.reload();
                        } else if (res.status === 404) {
                          alert('리뷰 보내기 실패');
                        }
                        console.dir(res);
                        console.log(res.data);
                      })
                      .catch((res) => {
                        alert('리뷰 보내기 실패');
                      });
                  }}
                >
                  <div>
                    <TextArea
                      name="reviewWriting"
                      minRows={3}
                      maxRows={20}
                      placeholder="어떤점이 마음에 드셨나요?"
                      onChange={this.handleInputValue('text')}
                    ></TextArea>
                  </div>
                  <Button type="submit">등록</Button>
                </form>
              </Contents>
            </center>
          </div>
        </Box1>
        <Box2>
          리뷰목록
          <div id="reviewReading"></div>
        </Box2>
      </Positioner>
    );
  }
}
export default withRouter(Review);
