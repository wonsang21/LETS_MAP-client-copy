import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage/landingPage';
import GlobalStyles from './Components/GlobalStyles';
import Login from './Components/utils/login';
function App() {
  return (
    <Router>
      <GlobalStyles />

      <Route path="/" excat component={LandingPage} />
      <Route path="/login" excat component={Login} />
    </Router>
  );
}

export default App;
