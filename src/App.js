import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Review from './Components/utils/Review';
import LandingPage from './Components/LandingPage/landingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/login';
import Signup from './Components/utils/Signup';
import Map from './Components/utils/Map';
import Header from './Components/LandingPage/Header';

require('dotenv').config();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, click: false });
  const [marketList, setmarketList] = useState([]);
  const [user, setUser] = useState({
    userid: '',
  });
  const [isloading, setLoading] = useState(false);
  const loginHandler = (id) => {
    if (!isLogin) {
      setUser({
        userid: id,
      });
    }
    setIsLogin(!isLogin);
  };

  const positionHandler = (x, y, click) => {
    setPosition({ x: x, y: y, click: click });
  };

  const marketListHandler = (marketList) => {
    setmarketList(marketList);
  };

  const getMarketList = async (input, indu, cb) => {
    console.log(input, indu);

    try {
      //마켓 찾는 중 ui
      setLoading(true);

      let res = await axios.get(
        `http://${process.env.REACT_APP_EC2_HOST}/filteringMarket?address=${input}&indutype=${indu}`,
      );
      let marketList = res.data.addressList;

      if (res.status === 200) {
        setmarketList(marketList);
        //map으로
        cb();
      } else {
        setmarketList([]);
        alert('server 오류');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    fetch('http://localhost:4000/userinfo', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('userToken'),
      }, // 이 부분은 따로 설정하고싶은 header가 있다면 넣으세요
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          res.json().then((json) => {
            console.log(json.userid);
            loginHandler(json.userid);
          });
        } else {
          console.error(res.statusText);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Switch>
        <Router>
          <GlobalStyles />
          <Route
            path="/"
            render={() => (
              <Header isLogin={isLogin} loginHandler={loginHandler} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage
                isloading={isloading}
                getMarketList={getMarketList}
                positionHandler={positionHandler}
                marketListHandler={marketListHandler}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <Login loginHandler={loginHandler} />}
          />
          <Route exact path="/signup" render={() => <Signup />} />

          <Route
            path="/map"
            render={() => <Map position={position} marketList={marketList} />}
          />
          <Route
            path="/review"
            render={() => (
              <Review
                isLogin={isLogin}
                user={user}
                loginHandler={loginHandler}
              />
            )}
          />
        </Router>
      </Switch>
    </div>
  );
}

export default App;
