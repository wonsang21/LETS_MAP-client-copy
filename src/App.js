import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/Login';
import Signup from './Components/utils/Signup';
import Map from './Components/utils/Map';

function App() {
  return (
    <div>
      <Switch>
        <Router>
          <GlobalStyles />
          <Route exact path="/" render={() => <LandingPage />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <Signup />} />
          <Route exact path="/map" render={() => <Map />} />
        </Router>
      </Switch>
    </div>
  );
}

export default App;
