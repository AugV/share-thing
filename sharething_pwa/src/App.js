import React from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { withFirebaseProvider } from "./Firebase";
import * as ROUTES from "./Constants/Routes";
import { withAuthentication } from "./Session";
import NavBar from "./Navigation/NaviBar";
import PrivateNav from "./Navigation/PrivateNav";
import LandingNav from "./Navigation/LandingNav";


//TODO: make router hierarchy
const App = () => (
  <BrowserRouter>
    <Container>
      <NavBar />
      <Switch>
        <Route path={ROUTES.PRIVATE_PAGE} component={PrivateNav} />
        <Route path={ROUTES.LANDING} component={LandingNav} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default withFirebaseProvider(withAuthentication(App));
