import React from "react";
import "./App.css";
import { Container } from "react-bootstrap";

import { Route, BrowserRouter, Switch } from "react-router-dom";

import { withFirebaseProvider } from "./Firebase";

import LandingScreen from "./Authentication/LandingScreen";
import HomeScreen from "./Home";
import PasswordResetScreen from "./Authentication/PasswordReset";
import * as ROUTES from "./Constants/Routes";
import AccountScreen from "./Account";
import AddItemScreen from "./AddItem";
import PublicScreen from "./PublicScreen/PublicScreen";
import { PrivatePage } from "./Navigation/PrivatePage";

import { withAuthentication } from "./Session";

import NavBar from "./Navigation/NaviBar";

//TODO: make router hierarchy
const App = () => (
  <BrowserRouter>
    <Container>
      <NavBar />
      <Switch>
        <Route path={ROUTES.PRIVATE_PAGE} component={PrivatePage} />
        <Route path={ROUTES.LANDING} component={LandingScreen} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default withFirebaseProvider(withAuthentication(App));
