import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignUpScreen';
import {BrowserRouter} from 'react-router-dom';
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
