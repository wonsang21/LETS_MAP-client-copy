import React, { Component } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';
import styled from 'styled-components';
import oc from 'open-color';
import { withRouter } from 'react-router-dom';
const GgButton = styled.button`
  width: 50%;
  float: right;
  margin-top: 1rem;
  border: 1px solid ${oc.gray[3]};
  line-height: 2.5rem;
  font-size: 1.25rem;
`;
class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  async componentDidMount() {
    let auth2 = await loadAuth2(
      '139094529764-ktta2a2m7f3hnie2pptb3futk490pr3r.apps.googleusercontent.com',
      '',
    );
    if (auth2.isSignedIn.get()) {
      this.updateUser(auth2.currentUser.get());
    } else {
      this.attachSignin(document.getElementById('customBtn'), auth2);
    }
  }
  async componentDidUpdate() {
    if (!this.state.user) {
      let auth2 = await loadAuth2(
        '139094529764-ktta2a2m7f3hnie2pptb3futk490pr3r.apps.googleusercontent.com',
        '',
      );
      this.attachSignin(document.getElementById('customBtn'), auth2);
    }
  }
  updateUser(currentUser) {
    let name = currentUser.getBasicProfile().getName();
    let profileImg = currentUser.getBasicProfile().getImageUrl();
    this.setState({
      user: {
        name: name,
        profileImg: profileImg,
      },
    });
  }
  attachSignin(element, auth2) {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        let userEmail = googleUser.getBasicProfile().getEmail();
        let userInfo_it = googleUser.getAuthResponse().id_token;
        var requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            it: userInfo_it,
            userid: userEmail,
          }),
        };

        fetch('http://localhost:4000/signin_google', requestOptions)
          .then((response) => response.text())
          .then((result) => JSON.parse(result))
          .then((json) => {
            console.dir(json);
            if (json.lcode === 200) {
              this.props.history.push('/');
            }
          })
          .catch((error) => console.log('error', error));
        this.updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  }
  signOut = () => {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.setState({ user: null });
      console.log('User signed out.');
    });
  };
  render() {
    if (this.state.user) {
      return (
        <GgButton>
          <div className="container">
            <div id="" className="btn logout" onClick={this.signOut}>
              구글 Logout
            </div>
          </div>
        </GgButton>
      );
    } else {
      return (
        <GgButton>
          <div className="container">
            <div id="customBtn" className="btn login">
              구글 Login
            </div>
          </div>
        </GgButton>
      );
    }
  }
}
export default withRouter(GoogleLogin);
