import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withFirebaseProvider } from './Firebase';
import * as ROUTES from './Constants/Routes';
import { withAuthentication } from './Session';
import NaviBar from './Routing/NaviBar';
import { Private } from './Routing/PrivateRoutes';
import LandingRoutes from './Routing/LandingRoutes';


// TODO:JSX Formatavimas 

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
