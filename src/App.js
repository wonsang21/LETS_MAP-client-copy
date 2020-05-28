import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/login';
import Signup from './Components/utils/Signup';
import Map from './Components/utils/Map';
import Header from './Components/LandingPage/Header';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  const positionHandler = (x, y) => {
    setPosition({ x: x, y: y });
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
        `${process.env.REACT_APP_EC2_HOST}/filteringMarket?address=${input}&indutype=${indu}`,
      );
      let marketList = res.data.addressList;

      if (res.status === 200) {
        setmarketList(marketList);
        //map으로
        cb();
      } else {
        alert('server 오류');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      return;
    }
  };

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
        </Router>
      </Switch>
    </div>
  );
}

export default App;
