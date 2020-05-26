import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/login';
import Signup from './Components/utils/Signup';
import Map from './Components/utils/Map';
import Header from './Components/LandingPage/Header';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState({
    userid: '',
  });
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
            render={() => <LandingPage positionHandler={positionHandler} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login loginHandler={loginHandler} />}
          />
          <Route exact path="/signup" render={() => <Signup />} />

          <Route path="/map" render={() => <Map position={position} />} />

        </Router>
      </Switch>
    </div>
  );
}

export default App;
