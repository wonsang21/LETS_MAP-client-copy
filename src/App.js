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

  const loginHandler = () => {
    setIsLogin(!isLogin);
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
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            render={() => <Login loginHandler={loginHandler} />}
          />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/map" render={() => <Map />} />
        </Router>
      </Switch>
    </div>
  );
}

export default App;
