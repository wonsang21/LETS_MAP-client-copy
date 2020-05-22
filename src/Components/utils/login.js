import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

class Login extends React.Component {
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
      <div>
        <center>
          <h1 style={{ color: 'dodgerblue' }}>로그인</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let data = this.state;
              axios.post(`${process.env.EC2_HOST}/signin`, data).then((res) => {
                console.log(res.data);
                this.props.history.push('/');
              });
            }}
          >
            <div>
              <input
                style={{
                  width: '400px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px',
                }}
                type="userid"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue('userid')}
              ></input>
            </div>
            <div>
              <input
                style={{
                  width: '400px',
                  height: '30px',
                  margin: '5px',
                  borderRadius: '5px',
                }}
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue('password')}
              ></input>
            </div>
            <div>
              <Link style={{ color: 'dodgerblue' }} to="/signup">
                회원가입
              </Link>
            </div>
            <button
              style={{
                width: '200px',
                height: '30px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: 'skyblue',
              }}
              type="submit"
            >
              로그인
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Login);
