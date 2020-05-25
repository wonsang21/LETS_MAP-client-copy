import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/Login';
import Signup from './Components/utils/Signup';
import KakaoMap from './Components/Map/KakaoMap';

function App() {
  return (
    <div>
      <Switch>
        <Router>
          <GlobalStyles />
          <Route exact path="/" render={() => <LandingPage />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exaxt path="/map" render={() => <KakaoMap />} />
        </Router>
      </Switch>
    </div>
  );
}

export default App;
