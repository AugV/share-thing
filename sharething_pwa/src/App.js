import React from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignUp';
import SignInScreen from './Login/SignIn';
import HomeScreen from './Home';


import * as ROUTES from './Constants/Routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LoginScreen} />
        <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
        <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
        <Route path={ROUTES.HOME} component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
