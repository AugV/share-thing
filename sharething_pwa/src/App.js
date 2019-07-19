import React from "react";
import "./App.css";

import { Route, BrowserRouter } from "react-router-dom";

import { withFirebaseProvider } from './Firebase';

import LoginScreen from "./Authentication/LoginScreen";
import SignUpScreen from "./Authentication/SignUp";
import SignInScreen from "./Authentication/SignIn";
import HomeScreen from "./Home";
import  PasswordResetScreen  from "./Authentication/PasswordReset";
import * as ROUTES from "./Constants/Routes";
import AccountScreen from "./Account";

import { withAuthentication } from "./Session";

const App = () => (
  <BrowserRouter>
    <Route exact path={ROUTES.LANDING} component={LoginScreen} />
    <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
    <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
    <Route path={ROUTES.HOME} component={HomeScreen} />
    <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
    <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
  </BrowserRouter>
);

export default withFirebaseProvider(withAuthentication(App));
