import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { withFirebaseProvider } from './Firebase';
import * as ROUTES from './Constants/Routes';
import { withAuthentication } from './Utils';
import { Private } from './Routes/Private';
import { LandingRoutes } from './Routes/Landing';
// import LandingRoutes from './Routes/Landing';

const App: React.FC = () => {
    return(
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.PRIVATE_PAGE} component={Private} />
        <Route path={ROUTES.LANDING} component={LandingRoutes} />
      </Switch>
  </BrowserRouter>
    );
};

export const Application = withFirebaseProvider(withAuthentication(App));
