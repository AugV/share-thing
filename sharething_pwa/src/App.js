import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignUpScreen';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginScreen} />
      <Route path="/signup" component={SignUpScreen} />
    </Switch>
  );
}

export default App;
