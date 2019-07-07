import React from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignUpScreen';


import * as ROUTES from './Constants/Routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LoginScreen} />
        <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
