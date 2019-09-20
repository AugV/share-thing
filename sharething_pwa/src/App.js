import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import { Route, BrowserRouter, Switch } from "react-router-dom";

import { withFirebaseProvider } from "./Firebase";

import LoginScreen from "./Authentication/LoginScreen";
import SignUpScreen from "./Authentication/SignUp";
import SignInScreen from "./Authentication/SignIn";
import HomeScreen from "./Home";
import PasswordResetScreen from "./Authentication/PasswordReset";
import * as ROUTES from "./Constants/Routes";
import AccountScreen from "./Account";
import AddItemScreen from "./AddItem";
import PublicScreen from "./PublicScreen/PublicScreen";

import { withAuthentication } from "./Session";

import NavBar from "./Navigation/NaviBar";

//TODO: make router hierarchy
const App = () => (
  <BrowserRouter>
    <Container>
      <NavBar />
      <Switch>
        {/* public */}
        <Route exact path={ROUTES.LANDING} component={LoginScreen} />
        <Route path={ROUTES.SIGN_IN} component={SignInScreen} />
        <Route path={ROUTES.SIGN_UP} component={SignUpScreen} />
        {/* user */}
        <Route path={ROUTES.ACCOUNT} component={AccountScreen} />
        <Route path={ROUTES.HOME} component={HomeScreen} />
        <Route path={ROUTES.PASSWORD_RESET} component={PasswordResetScreen} />
        <Route path={ROUTES.ADD_ITEM} component={AddItemScreen} />
        <Route path={ROUTES.PUBLIC} component={PublicScreen} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default withFirebaseProvider(withAuthentication(App));
