import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

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
      <div>
        <center>
          <h1 style={{ color: 'dodgerblue' }}>회원가입</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post('http://localhost:4000/signup', {
                  userid: this.state.userid,
                  password: this.state.password,
                })
                .then((res) => {
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
                onChange={this.handleInputValue('password')}
                type="password"
                placeholder="비밀번호를 입력 해주세요"
              ></input>
            </div>
            <div>
              <Link style={{ color: 'dodgerblue' }} to="/">
                이미 아이디가 있으신가요?
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
              회원가입
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Signup);
