import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withFirebaseProvider } from './Firebase';
import * as ROUTES from './Constants/Routes';
import { withAuthentication } from './Utils';
import { Private } from './Routes/Private';
import LandingRoutes from './Routes/Landing';
import { MainNavBar } from './Components/NavBar/NavBar';

const App = () => (
  <BrowserRouter>
      <MainNavBar />
    <Container>
      <Switch>
        <Route path={ROUTES.PRIVATE_PAGE} component={Private} />
        <Route path={ROUTES.LANDING} component={LandingRoutes} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export const Application = withFirebaseProvider(withAuthentication(App));
