import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withFirebaseProvider } from './Firebase';
import * as ROUTES from './Constants/Routes';
import { withAuthentication } from './Utils';
import NaviBar from './Routes/NaviBar';
import { Private } from './Routes/Private';
import LandingRoutes from './Routes/Landing';

const App = () => (
  <BrowserRouter>
    <Container>
      <NaviBar />
      <Switch>
        <Route path={ROUTES.PRIVATE_PAGE} component={Private} />
        <Route path={ROUTES.LANDING} component={LandingRoutes} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export const Application = withFirebaseProvider(withAuthentication(App));
